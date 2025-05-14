import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DeveloperCard = ({ developer }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{developer.name}</Text>
      <Text style={styles.role}>{developer.experience} Developer</Text>
      <Text style={styles.bio}>{developer.bio}</Text>
      <View style={styles.skills}>
        {developer.skills.map((skill, idx) => (
          <Text key={idx} style={styles.skill}>{skill}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  role: { fontSize: 16, color: '#555', marginBottom: 8 },
  bio: { fontSize: 14, color: '#444', marginBottom: 12 },
  skills: { flexDirection: 'row', flexWrap: 'wrap' },
  skill: {
    backgroundColor: '#e5e7eb',
    color: '#333',
    fontSize: 12,
    marginRight: 6,
    marginBottom: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  }
});

export default DeveloperCard;
