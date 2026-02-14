import { useClosetStore } from '@/src/state/closetStore';
import { useAppTheme } from '@/src/theme/ThemeContext';
import { Chip } from '@/src/ui/Chip';
import { Screen } from '@/src/ui/Screen';
import { Touchable } from '@/src/ui/Touchable';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const CATEGORIES = ['hat', 'accessory', 'outfit', 'background'] as const;

export default function ClosetScreen() {
    const { colors, spacing, fontSizes, radii } = useAppTheme();
    const { catalog, inventory, toggleEquip } = useClosetStore();
    const [activeCategory, setActiveCategory] = useState<string>('hat');

    const filteredCatalog = catalog.filter((item) => item.category === activeCategory);

    return (
        <Screen style={{ padding: spacing.lg }}>
            <Text style={[styles.title, { fontSize: fontSizes.xl, color: colors.text, marginBottom: spacing.md }]}>Closet</Text>

            {/* Category tabs */}
            <View style={[styles.categoryRow, { gap: spacing.sm, marginBottom: spacing.lg }]}>
                {CATEGORIES.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                        selected={activeCategory === cat}
                        onPress={() => setActiveCategory(cat)}
                    />
                ))}
            </View>

            {/* Items grid */}
            {filteredCatalog.length === 0 ?
                <View style={styles.emptyContainer}>
                    <Text style={{ color: colors.textMuted, fontSize: fontSizes.md }}>No items in this category yet</Text>
                    <Text style={{ color: colors.textMuted, fontSize: fontSizes.sm, marginTop: spacing.xs }}>
                        Items will appear here once catalog is seeded
                    </Text>
                </View>
            :   <FlatList
                    data={filteredCatalog}
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={{ gap: spacing.sm }}
                    contentContainerStyle={{ gap: spacing.sm }}
                    renderItem={({ item }) => {
                        const owned = inventory.find((inv) => inv.itemKey === item.assetKey);
                        const equipped = owned?.equipped ?? false;

                        return (
                            <Touchable
                                onPress={() => {
                                    if (owned) toggleEquip(owned.id);
                                }}
                                style={[
                                    styles.gridItem,
                                    {
                                        backgroundColor: equipped ? colors.primary : colors.surface,
                                        borderRadius: radii.lg,
                                        padding: spacing.md,
                                        borderColor: equipped ? colors.primary : colors.border,
                                    },
                                ]}
                            >
                                <Text style={{ fontSize: 28, marginBottom: spacing.xs }}>
                                    {item.category === 'hat' ?
                                        '🎩'
                                    : item.category === 'accessory' ?
                                        '🎀'
                                    : item.category === 'outfit' ?
                                        '👕'
                                    :   '🖼️'}
                                </Text>
                                <Text
                                    style={[
                                        styles.itemName,
                                        {
                                            color: equipped ? colors.primaryText : colors.text,
                                            fontSize: fontSizes.xs,
                                        },
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        color: equipped ? colors.primaryText : colors.textMuted,
                                        fontSize: fontSizes.xs,
                                        marginTop: 2,
                                    }}
                                >
                                    {owned ?
                                        equipped ?
                                            'Equipped'
                                        :   'Owned'
                                    :   `${item.unlockValue} ${item.unlockType}`}
                                </Text>
                            </Touchable>
                        );
                    }}
                />
            }
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: { fontWeight: '700' },
    categoryRow: { flexDirection: 'row' },
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    gridItem: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        maxWidth: '32%',
        overflow: 'hidden',
    },
    itemName: { fontWeight: '500', textAlign: 'center' },
});
