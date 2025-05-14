export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileCompleted: boolean;
  subscription: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  formattedAddress: string;
  location: {
    lat: number;
    lng: number;
  };
} 