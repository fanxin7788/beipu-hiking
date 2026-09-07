export interface Waypoint {
  id: string;
  name: string;
  elevation: number;
  time: string;
  distanceKm: number;
  description: string;
  type: 'start' | 'water' | 'summit' | 'scenic' | 'end';
}

export interface CommentReply {
  id: string;
  author: string;
  role?: string;
  content: string;
  time: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  userLiked?: boolean;
  reply?: CommentReply;
}

export interface GearItem {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  isMandatory: boolean;
  checked: boolean;
  category: 'essential' | 'apparel' | 'nutrition' | 'safety';
  tips?: string;
}

export interface HikingEvent {
  id: string;
  title: string;
  subtitle: string;
  tag1: string;
  tag2: string;
  heroImage: string;
  elevationGain: string;
  difficulty: string;
  groupSize: number;
  spotsLeft: number;
  date: string;
  timeRange: string;
  timezone: string;
  departureCity: string;
  departureLocation: string;
  departureCoords: string;
  mapImage: string;
  routeMapImage: string;
  routeName: string;
  routeType: string;
  distanceKm: number;
  durationHours: number;
  waterStationsCount: number;
  maxAltitudeMeters: number;
  gearIntro: string;
  leader: {
    name: string;
    role: string;
    badge: string;
    phone: string;
    avatar: string;
    bio: string;
    lineGroup: string;
    whatsappGroup: string;
  };
  waypoints: Waypoint[];
  gearList: GearItem[];
  comments: Comment[];
}

export interface RegistrationForm {
  name: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  experienceLevel: 'beginner' | 'moderate' | 'experienced';
  carpoolNeeded: boolean;
  notes: string;
}

export interface RegisteredTicket {
  ticketId: string;
  eventName: string;
  registeredAt: string;
  userName: string;
  userPhone: string;
  emergencyContact: string;
  status: 'confirmed' | 'pending';
}
