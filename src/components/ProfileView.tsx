import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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

interface BlogItem {
  id: number;
  title: string;
  topic: string;
  wordCount: number;
  createdOn: string;
  lastUpdated: string;
}

export default function ProfileView({ userId, isOwnProfile }: ProfileViewProps) {
  const { user } = useAuth();

  const currentUserId = user?.id ?? user?.user_id;
  const targetUserId = userId ?? currentUserId;

  const [profile, setProfile] = useState<UserProfile>({
    firstName: isOwnProfile ? (user?.first_name || 'Philo') : '',
    surname: isOwnProfile ? (user?.surname || 'Sophie') : '',
    bio: null,
    totalFriends: 0,
    totalBlogs: 0,
    avatarUrl: null,
  });

  const [friendStatus, setFriendStatus] = useState<'none' | 'requested' | 'friends'>('none');
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Blog states
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [blogSearch, setBlogSearch] = useState('');
  const [isBlogsLoading, setIsBlogsLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (targetUserId) {
      fetchProfileData();
    }
  }, [targetUserId]);

  useEffect(() => {
    if (targetUserId) {
      fetchUserBlogs();
    }
  }, [targetUserId, blogSearch]);

  const fetchProfileData = async () => {
    if (!targetUserId) return;
    setIsLoading(true);

    try {
      const url = `${API_BASE_URL}/utilities/profile/api_get_profile.php?user_id=${targetUserId}&viewer_id=${currentUserId}`;
      const response = await fetch(url);
      const rawText = await response.text();

      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        return;
      }

      const data = JSON.parse(rawText);

      if (data.success && data.data) {
        setProfile({
          firstName: data.data.first_name || '',
          surname: data.data.surname || '',
          bio: data.data.bio || null,
          totalFriends: data.data.total_friends ?? 0,
          totalBlogs: data.data.total_blogs ?? 0,
          avatarUrl: data.data.avatar_url || null,
        });

        if (data.data.friend_status) {
          setFriendStatus(data.data.friend_status);
        }
      }
    } catch (error) {
      console.error('Failed to load profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserBlogs = async () => {
    if (!targetUserId) return;
    setIsBlogsLoading(true);

    try {
      const url = `${API_BASE_URL}/utilities/blogs/api_get_user_blogs.php?user_id=${targetUserId}&search=${encodeURIComponent(
        blogSearch
      )}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.success && Array.isArray(data.data)) {
        setBlogs(data.data);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error('Failed to load user blogs:', error);
      setBlogs([]);
    } finally {
      setIsBlogsLoading(false);
    }
  };

  const handleFriendAction = async () => {
    if (friendStatus !== 'none' || !targetUserId) return;

    setIsActionLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/utilities/add_friend.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userId=${targetUserId}`,
      });

      const data = await response.json();

      if (data.status === 'success' || data.status === 'already_requested') {
        setFriendStatus('requested');
      } else if (data.status === 'already_friends') {
        setFriendStatus('friends');
      } else {
        Alert.alert('Error', data.message || 'Could not send friend request.');
      }
    } catch (error) {
      console.error('Failed to send friend request:', error);
      Alert.alert('Connection Error', 'Please check your network connection.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const getFormattedAvatarUri = (url: string | null) => {
    if (!url || url.trim() === '') return null;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const cleanPath = url.startsWith('/') ? url.slice(1) : url;
    return `${API_BASE_URL}/${cleanPath}`;
  };

  const formattedAvatarUri = getFormattedAvatarUri(profile.avatarUrl);

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
                  <Text style={[styles.bioText, !profile.bio && styles.noBioText]}>
                    {profile.bio || (isOwnProfile ? 'Add bio here' : 'No bio provided')}
                    {isOwnProfile && (
                      <Text>
                        {'  '}
                        <Ionicons
                          name="create-outline"
                          size={18}
                          color={profile.bio ? '#f36d6f' : '#28a745'}
                        />
                      </Text>
                    )}
                  </Text>
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
                  {/* 1. Send Message Button */}
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.messagesBtn]}
                    onPress={() => {
                      if (isOwnProfile) {
                        router.push('/messages');
                      } else {
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

                  {/* 2. Dynamic Friend Button (Only visible on other users' profiles) */}
                  {!isOwnProfile && (
                    <TouchableOpacity
                      style={[
                        styles.actionBtn,
                        friendStatus === 'friends' && styles.friendsBtn,
                        friendStatus === 'requested' && styles.requestedBtn,
                        friendStatus === 'none' && styles.addFriendBtn,
                      ]}
                      onPress={handleFriendAction}
                      activeOpacity={0.8}
                      disabled={friendStatus === 'requested' || isActionLoading}
                    >
                      {isActionLoading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                      ) : (
                        <>
                          <Text style={styles.actionBtnText}>
                            {friendStatus === 'friends' && 'Friends'}
                            {friendStatus === 'requested' && 'Requested'}
                            {friendStatus === 'none' && 'Add friend'}
                          </Text>
                          <Ionicons
                            name={
                              friendStatus === 'friends'
                                ? 'checkmark-sharp'
                                : friendStatus === 'requested'
                                ? 'hourglass'
                                : 'add'
                            }
                            size={16}
                            color="#ffffff"
                            style={styles.btnIcon}
                          />
                        </>
                      )}
                    </TouchableOpacity>
                  )}

                  {/* 3. Photo Album Button */}
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

              {/* Right Column: Avatar & Action Links */}
              <View style={styles.avatarColumn}>
                <View style={styles.avatarContainer}>
                  {formattedAvatarUri ? (
                    <Image source={{ uri: formattedAvatarUri }} style={styles.avatarImage} />
                  ) : (
                    <Ionicons name="person" size={100} color="#b0b0b0" />
                  )}
                </View>

                {isOwnProfile && (
                  <>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={styles.changeAvatarText}>Change Profile Image</Text>
                    </TouchableOpacity>

                    {/* Rendered only when a profile image exists */}
                    {Boolean(formattedAvatarUri) && (
                      <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.removeAvatarText}>Remove Profile Image</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </View>{/* Closing profileHeader View */}

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
                  placeholder={
                    isOwnProfile
                      ? 'Search Your Blogs by Title or Topic'
                      : `Search ${profile.firstName}'s Blogs by Title or Topic`
                  }
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

              {/* Blog Cards List */}
              {isBlogsLoading ? (
                <ActivityIndicator size="small" color="#007aff" style={{ marginVertical: 20 }} />
              ) : blogs.length > 0 ? (
                blogs.map((blog) => (
                  <TouchableOpacity
                    key={blog.id}
                    style={styles.blogCard}
                    activeOpacity={0.85}
                    onPress={() =>
                      router.push({
                        pathname: '/blogs',
                        params: { id: blog.id },
                      } as any)
                    }
                  >
                    <Text style={styles.blogTitleText}>{blog.title}</Text>
                    <Text style={styles.blogMetaText}>Topic: {blog.topic}</Text>
                    <Text style={styles.blogMetaText}>Word Count: {blog.wordCount}</Text>
                    <Text style={styles.blogMetaText}>Created On: {blog.createdOn}</Text>
                    <Text style={styles.blogMetaText}>Last Updated: {blog.lastUpdated}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyBlogsContainer}>
                  <Text style={styles.emptyBlogsText}>
                    {isOwnProfile
                      ? 'You have not published any blogs.'
                      : `${profile.firstName || 'This user'} has not published any blogs.`}
                  </Text>
                </View>
              )}
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