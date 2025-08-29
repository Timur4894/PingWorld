import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DottedBackground from '../components/DottedBackground';
import Glass from '../components/Glass';
import SegmentedChips from '../components/SegmentedChips';
import { colors, typography } from '../utils/theme';

const sampleCountries = [
  { country: 'USA', users: 1234 },
  { country: 'Germany', users: 542 },
  { country: 'Kazakhstan', users: 231 },
  { country: 'Russia', users: 842 },
];

export default function StatsScreen() {
  const totalUsers = sampleCountries.reduce((sum, item) => sum + item.users, 0);
  const [tab, setTab] = React.useState('Trending');

  return (
    <DottedBackground>
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={[styles.title, typography.title]}>Explore</Text>
        <SegmentedChips items={["Trending","Top Creators","Editor's Pick"]} value={tab} onChange={setTab} />
        <FlatList
          style={{ marginTop: 12 }}
          data={sampleCountries}
          keyExtractor={(it) => it.country}
          renderItem={({ item }) => (
            <Glass style={{ marginBottom: 10 }}>
              <View style={styles.row}>
                <Text style={[styles.country, { color: colors.text }]}>{item.country}</Text>
                <Text style={[styles.count, { color: colors.text }]}>{item.users}</Text>
              </View>
            </Glass>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
        />
      </View>
    </DottedBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  country: { fontSize: 16 },
  count: { fontSize: 16, fontWeight: '600' },
  sep: { height: 1, backgroundColor: '#eee' },
  sub: { marginTop: 12, color: '#666' },
});


