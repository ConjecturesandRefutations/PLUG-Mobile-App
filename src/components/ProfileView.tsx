import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE_URL } from '../constants/api';
import { useAuth } from '../context/AuthContext';
import { profileStyles as styles } from '../styles/profileStyles';
import Footer from './Footer';

interface ProfileViewProps {
  userId?: number | string;
  isOwnProfile: boolean;
}

interface UserProfile {
  firstName: string;
  surname: string;
  bio: string | null;
  totalFriends: number;
  totalBlogs: number;
  avatarUrl: string | null;
}

export default function ProfileView({ userId, isOwnProfile }: ProfileViewProps) {
  const { user } = useAuth();
  
  // Use targetUserId from props or fallback to authenticated user's ID
  const targetUserId = userId ?? user?.id;

  const [profile, setProfile] = useState<UserProfile>({
    firstName: isOwnProfile ? (user?.first_name || 'Philo') : '',
    surname: isOwnProfile ? (user?.surname || 'Sophie') : '',
    bio: null,
    totalFriends: 0,
    totalBlogs: 0,
    avatarUrl: null,
  });
  const [blogSearch, setBlogSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (targetUserId) {
      fetchProfileData();
    }
  }, [targetUserId]);

  const fetchProfileData = async () => {
    if (!targetUserId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/profile/api_get_profile.php?user_id=${targetUserId}`);
      const data = await response.json();
      if (response.ok && data.success) {
        setProfile({
          firstName: data.data.first_name,
          surname: data.data.surname,
          bio: data.data.bio,
          totalFriends: data.data.total_friends ?? 0,
          totalBlogs: data.data.total_blogs ?? 0,
          avatarUrl: data.data.avatar_url,
        });
      }
    } catch (error) {
      console.error('Failed to load profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickAvatar = () => {
    if (!isOwnProfile) return;
    console.log('Pick avatar clicked');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#007aff" style={styles.loader} />
        ) : (
          <>
            {/* Top User Summary Section */}
            <View style={styles.profileHeader}>
              {/* Left Column: Name, Bio, Stats, Actions */}
              <View style={styles.infoColumn}>
                <Text style={styles.userNameText}>
                  {profile.firstName}
                  {'\n'}
                  {profile.surname}
                </Text>

                {/* Bio Display / Link */}
                <TouchableOpacity
                  style={styles.bioContainer}
                  activeOpacity={isOwnProfile ? 0.7 : 1}
                  disabled={!isOwnProfile}
                >
                  <Text style={styles.bioLinkText}>
                    {profile.bio || (isOwnProfile ? 'Add bio here' : 'No bio provided')}
                  </Text>
                  {isOwnProfile && (
                    <Ionicons name="create-outline" size={18} color="#28a745" />
                  )}
                </TouchableOpacity>

                {/* Friend & Blog Counters */}
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.friendsText}>
                    Total Friends: {profile.totalFriends}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.blogsCountText}>
                  Total Blogs: {profile.totalBlogs}
                </Text>

                {/* Action Buttons Stack */}
                <View style={styles.actionButtonsStack}>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.messagesBtn]}
                    onPress={() => {
                      if (isOwnProfile) {
                        router.push('/messages');
                      } else {
                        // Navigates to messages with the target user's ID
                        router.push({
                          pathname: '/messages',
                          params: { userId: targetUserId },
                        });
                      }
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionBtnText}>
                      {isOwnProfile ? 'Messages' : 'Send Message'}
                    </Text>
                    <Ionicons name="mail" size={16} color="#ffffff" style={styles.btnIcon} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, styles.photoAlbumBtn]}
                    onPress={() => router.push('/photo-album')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionBtnText}>Photo Album</Text>
                    <Ionicons name="images" size={16} color="#ffffff" style={styles.btnIcon} />
                  </TouchableOpacity>

                  {/* Settings button is only visible on your own profile */}
                  {isOwnProfile && (
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.settingsBtn]}
                      onPress={() => router.push('/settings')}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.actionBtnText}>Settings</Text>
                      <Ionicons name="settings" size={16} color="#ffffff" style={styles.btnIcon} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Right Column: Avatar & Change Photo Button */}
              <View style={styles.avatarColumn}>
                <View style={styles.avatarContainer}>
                  {profile.avatarUrl ? (
                    <Image source={{ uri: profile.avatarUrl }} style={styles.avatarImage} />
                  ) : (
                    <Ionicons name="person" size={100} color="#b0b0b0" />
                  )}
                </View>
                {isOwnProfile && (
                  <TouchableOpacity onPress={handlePickAvatar} activeOpacity={0.7}>
                    <Text style={styles.changeAvatarText}>Change Profile Image</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Blogs Section */}
            <View style={styles.blogsSection}>
              <Text style={styles.sectionTitle}>
                {isOwnProfile ? 'Your Blogs' : `${profile.firstName}'s Blogs`}
              </Text>

              {/* Search Row */}
              <View style={styles.searchRow}>
                <Ionicons name="search-outline" size={24} color="#1a1a1a" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Blogs by Title or Topic"
                  placeholderTextColor="#8e8e93"
                  value={blogSearch}
                  onChangeText={setBlogSearch}
                />
              </View>

              {/* See Drafts Link (Only on own profile) */}
              {isOwnProfile && (
                <TouchableOpacity style={styles.draftsContainer} activeOpacity={0.7}>
                  <Text style={styles.draftsText}>See Drafts</Text>
                </TouchableOpacity>
              )}

              {/* Empty Blog State */}
              <View style={styles.emptyBlogsContainer}>
                <Text style={styles.emptyBlogsText}>
                  {isOwnProfile
                    ? 'You have not published any blogs.'
                    : `${profile.firstName || 'This user'} has not published any blogs.`}
                </Text>
              </View>
            </View>
          </>
        )}

        {/* Scrollable Footer */}
        <SafeAreaView edges={['bottom']} style={styles.footerSafeArea}>
          <Footer />
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}