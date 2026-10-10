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
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../constants/api';
import { useAuth } from '../context/AuthContext';
import { profileStyles as styles } from '../styles/profileStyles';

interface UserProfile {
  firstName: string;
  surname: string;
  bio: string | null;
  totalFriends: number;
  totalBlogs: number;
  avatarUrl: string | null;
}

export default function ProfileScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    firstName: user?.first_name || 'Philo',
    surname: user?.surname || 'Sophie',
    bio: null,
    totalFriends: 0,
    totalBlogs: 0,
    avatarUrl: null,
  });
  const [blogSearch, setBlogSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/profile/api_get_profile.php?user_id=${user.id}`);
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
    // Image picker logic will trigger here
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

                {/* Bio Link */}
                <TouchableOpacity style={styles.bioContainer} activeOpacity={0.7}>
                  <Text style={styles.bioLinkText}>
                    {profile.bio || 'Add bio here'}
                  </Text>
                  <Ionicons name="create-outline" size={18} color="#28a745" />
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
                    onPress={() => router.push('/messages')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionBtnText}>Messages</Text>
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

                  <TouchableOpacity
                    style={[styles.actionBtn, styles.settingsBtn]}
                    onPress={() => router.push('/settings')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionBtnText}>Settings</Text>
                    <Ionicons name="settings" size={16} color="#ffffff" style={styles.btnIcon} />
                  </TouchableOpacity>
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
                <TouchableOpacity onPress={handlePickAvatar} activeOpacity={0.7}>
                  <Text style={styles.changeAvatarText}>Change Profile Image</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Blogs Section */}
            <View style={styles.blogsSection}>
              <Text style={styles.sectionTitle}>Your Blogs</Text>

              {/* Search Row */}
              <View style={styles.searchRow}>
                <Ionicons name="search-outline" size={24} color="#1a1a1a" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Your Blogs by Title or Topic"
                  placeholderTextColor="#8e8e93"
                  value={blogSearch}
                  onChangeText={setBlogSearch}
                />
              </View>

              {/* See Drafts Link */}
              <TouchableOpacity style={styles.draftsContainer} activeOpacity={0.7}>
                <Text style={styles.draftsText}>See Drafts</Text>
              </TouchableOpacity>

              {/* Empty Blog State */}
              <View style={styles.emptyBlogsContainer}>
                <Text style={styles.emptyBlogsText}>You have not published any blogs.</Text>
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