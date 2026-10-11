import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../constants/api';
import { useAuth } from '../context/AuthContext';
import { allUsersStyles as styles } from '../styles/allUsersStyles';

interface UserItem {
  user_id: number;
  name: string;
  profile_image: string | null;
  numFriends: number;
  numBlogs: number;
}

const PAGE_LIMIT = 12;

export default function UsersScreen() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async (
    currentOffset: number,
    searchTerm: string,
    reset: boolean = false
  ) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const url = `${API_BASE_URL}/utilities/fetch_users.php?search=${encodeURIComponent(
        searchTerm
      )}&offset=${currentOffset}&limit=${PAGE_LIMIT}`;

      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        if (reset) {
          setUsers(data);
        } else {
          setUsers((prev) => [...prev, ...data]);
        }

        setHasMore(data.length === PAGE_LIMIT);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsers(0, search, true);
  }, []);

  // Handle Search Input Change
  const handleSearchChange = (text: string) => {
    setSearch(text);
    setOffset(0);
    fetchUsers(0, text, true);
  };

  // Pull to Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setOffset(0);
    fetchUsers(0, search, true);
  };

  // Load More Pages when scrolling down
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextOffset = offset + PAGE_LIMIT;
      setOffset(nextOffset);
      fetchUsers(nextOffset, search, false);
    }
  };

  const handleUserClick = (targetUserId: number) => {
    if (currentUser?.id === targetUserId) {
      router.push('/profile');
    } else {
      router.push({
        pathname: '/user/[id]',
        params: { id: targetUserId },
      });
    }
  };

  const renderUserCard = useCallback(
    ({ item }: { item: UserItem }) => {
      const imageUrl = item.profile_image
        ? item.profile_image.startsWith('http')
          ? item.profile_image
          : `${API_BASE_URL}/${item.profile_image}`
        : null;

      return (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => handleUserClick(Number(item.user_id))}
        >
          {/* User Image Area */}
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.userImage} resizeMode="cover" />
            ) : (
              <View style={styles.placeholderImage}>
                <Ionicons name="person" size={140} color="#999999" />
              </View>
            )}
          </View>

          {/* User Meta Container */}
          <View style={styles.cardContent}>
            <Text style={styles.userNameText}>{item.name}</Text>
            <Text style={styles.metaText}>Total Friends: {item.numFriends ?? 0}</Text>
            <Text style={styles.metaText}>Total Blogs: {item.numBlogs ?? 0}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [currentUser?.id]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.user_id)}
        renderItem={renderUserCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor="#007aff" />
        }
        ListHeaderComponent={
          <View style={styles.headerArea}>
            <Text style={styles.pageTitle}>All Users</Text>
            {/* Search Input Bar */}
            <View style={styles.searchRow}>
              <Ionicons name="search-outline" size={22} color="#555555" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search users..."
                placeholderTextColor="#8e8e93"
                value={search}
                onChangeText={handleSearchChange}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No users found.</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          <View>
            {isLoading && !isRefreshing && (
              <ActivityIndicator size="small" color="#007aff" style={styles.loadingMore} />
            )}
            <SafeAreaView edges={['bottom']}>
              <Footer />
            </SafeAreaView>
          </View>
        }
      />
    </SafeAreaView>
  );
}