import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { addEventToCalendar } from '../utils/calendarUtils';
import { joinHackathon } from '../supabaseClient';

const JoinModal = ({ visible, hackathon, onClose, onSuccess }) => {
  const [joinType, setJoinType] = useState('solo'); // 'solo' or 'team'
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState(['']);
  const [joinStatus, setJoinStatus] = useState('initial'); // 'initial', 'processing', 'success'

  const handleAddTeamMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([...teamMembers, '']);
    } else {
      Alert.alert('Team Size Limit', 'You can add up to 4 team members only.');
    }
  };

  const handleUpdateTeamMember = (text, index) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = text;
    setTeamMembers(newTeamMembers);
  };

  const handleRemoveTeamMember = (index) => {
    if (teamMembers.length > 1) {
      const newTeamMembers = [...teamMembers];
      newTeamMembers.splice(index, 1);
      setTeamMembers(newTeamMembers);
    }
  };

  const handleJoin = async () => {
    setJoinStatus('processing');
    
    try {
      // In a real app, you would get the actual user ID
      const mockUserId = '123e4567-e89b-12d3-a456-426614174000';
      
      // Filter out empty email addresses
      const filteredTeamMembers = teamMembers.filter(email => email.trim() !== '');
      
      const result = await joinHackathon(
        mockUserId,
        hackathon.id,
        joinType,
        joinType === 'team' ? teamName : null,
        joinType === 'team' ? filteredTeamMembers : []
      );
      
      if (result.success) {
        setJoinStatus('success');
      } else {
        Alert.alert('Join Failed', result.message || 'Failed to join the hackathon');
        setJoinStatus('initial');
      }
    } catch (error) {
      console.error('Error joining hackathon:', error);
      Alert.alert('Error', 'Something went wrong while joining the hackathon');
      setJoinStatus('initial');
    }
  };

  const handleAddToCalendar = async () => {
    try {
      const result = await addEventToCalendar({
        title: hackathon.name,
        startDate: new Date(hackathon.start_date),
        endDate: new Date(hackathon.end_date),
        location: hackathon.location,
        notes: `You've joined this hackathon ${joinType === 'team' ? 'with your team ' + teamName : 'solo'}.`
      });
      
      if (result.success) {
        Alert.alert('Success', 'Event added to your calendar!');
        // Complete the flow
        onSuccess();
      } else {
        Alert.alert('Calendar Error', result.error || 'Failed to add event to calendar');
      }
    } catch (error) {
      console.error('Error adding to calendar:', error);
      Alert.alert('Error', 'Something went wrong while adding to calendar');
    }
  };

  const handleSkipCalendar = () => {
    onSuccess();
  };

  const renderJoinOptions = () => (
    <View style={styles.joinOptions}>
      <Text style={styles.sectionTitle}>How would you like to join?</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            joinType === 'solo' && styles.selectedOption
          ]}
          onPress={() => setJoinType('solo')}
        >
          <Feather 
            name="user" 
            size={24} 
            color={joinType === 'solo' ? '#FFFFFF' : '#4F46E5'} 
          />
          <Text style={[
            styles.optionText,
            joinType === 'solo' && styles.selectedOptionText
          ]}>Join Solo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.optionButton,
            joinType === 'team' && styles.selectedOption
          ]}
          onPress={() => setJoinType('team')}
        >
          <Feather 
            name="users" 
            size={24} 
            color={joinType === 'team' ? '#FFFFFF' : '#4F46E5'} 
          />
          <Text style={[
            styles.optionText,
            joinType === 'team' && styles.selectedOptionText
          ]}>Join With Team</Text>
        </TouchableOpacity>
      </View>
      
      {joinType === 'team' && (
        <View style={styles.teamSection}>
          <Text style={styles.fieldLabel}>Team Name</Text>
          <TextInput
            style={styles.input}
            value={teamName}
            onChangeText={setTeamName}
            placeholder="Enter your team name"
            placeholderTextColor="#9CA3AF"
          />
          
          <Text style={styles.fieldLabel}>Invite Team Members (up to 4)</Text>
          {teamMembers.map((email, index) => (
            <View key={index} style={styles.teamMemberRow}>
              <TextInput
                style={[styles.input, styles.teamMemberInput]}
                value={email}
                onChangeText={(text) => handleUpdateTeamMember(text, index)}
                placeholder="team@member.email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveTeamMember(index)}
                disabled={teamMembers.length === 1}
              >
                <Feather 
                  name="x-circle" 
                  size={24} 
                  color={teamMembers.length === 1 ? '#D1D5DB' : '#EF4444'} 
                />
              </TouchableOpacity>
            </View>
          ))}
          
          {teamMembers.length < 4 && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddTeamMember}
            >
              <Feather name="plus-circle" size={20} color="#4F46E5" />
              <Text style={styles.addButtonText}>Add Team Member</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      <TouchableOpacity
        style={styles.joinButton}
        onPress={handleJoin}
        disabled={joinStatus === 'processing'}
      >
        {joinStatus === 'processing' ? (
          <Text style={styles.joinButtonText}>Processing...</Text>
        ) : (
          <Text style={styles.joinButtonText}>Join Hackathon</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderSuccessState = () => (
    <View style={styles.successContainer}>
      <View style={styles.successIconContainer}>
        <Feather name="check-circle" size={64} color="#10B981" />
      </View>
      
      <Text style={styles.successTitle}>
        You've successfully joined!
      </Text>
      
      <Text style={styles.successMessage}>
        {joinType === 'team' 
          ? `You and your team "${teamName}" are now registered for ${hackathon.name}.`
          : `You're now registered for ${hackathon.name}.`
        }
      </Text>
      
      <Text style={styles.calendarQuestion}>
        Add this event to your calendar?
      </Text>
      
      <View style={styles.calendarOptions}>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={handleAddToCalendar}
        >
          <Feather name="calendar" size={20} color="#FFFFFF" />
          <Text style={styles.calendarButtonText}>Add to Calendar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkipCalendar}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {joinStatus === 'success' ? 'Success!' : hackathon?.name || 'Join Hackathon'}
            </Text>
            
            {joinStatus !== 'success' && (
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Feather name="x" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
          
          <ScrollView style={styles.modalContent}>
            {joinStatus === 'success' ? renderSuccessState() : renderJoinOptions()}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
  },
  joinOptions: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4F46E5',
    marginHorizontal: 6,
  },
  selectedOption: {
    backgroundColor: '#4F46E5',
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#4F46E5',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  teamSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    marginBottom: 16,
  },
  teamMemberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamMemberInput: {
    flex: 1,
    marginBottom: 8,
  },
  removeButton: {
    marginLeft: 8,
    padding: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: 4,
  },
  addButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    padding: 16,
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  calendarQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  calendarOptions: {
    width: '100%',
  },
  calendarButton: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  calendarButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  skipButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  skipButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default JoinModal;
