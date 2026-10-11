import ProfileView from '../../components/ProfileView';
import { useAuth } from '../../context/AuthContext';

export default function MyProfileScreen() {
  const { user } = useAuth();

  return <ProfileView userId={user?.id} isOwnProfile={true} />;
}