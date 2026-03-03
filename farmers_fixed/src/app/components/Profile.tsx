import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Mail, Phone, MapPin, Calendar, Shield, Star, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockUser } from '../data/mockData';
import { toast } from 'sonner';

export function Profile() {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockUser);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Profile</h1>
        <p className="text-emerald-600 mt-1">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="bg-white border-emerald-200 lg:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback className="bg-emerald-200 text-emerald-900 text-2xl">
                  {formData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-bold text-xl text-emerald-900 mb-1">{formData.name}</h2>
              <Badge className="mb-4 bg-emerald-600 capitalize">{formData.role}</Badge>
              {formData.verified && (
                <Badge variant="outline" className="border-blue-500 text-blue-700 mb-4">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              <div className="space-y-3 mt-6 text-left">
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Joined {formData.joinDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="bg-white border-emerald-200 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-emerald-900">Account Details</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </div>
              {!isEditing && (
                <Button 
                  variant="outline" 
                  className="border-emerald-300"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="bg-white border border-emerald-200">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="business">Business Details</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="border-emerald-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="border-emerald-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="border-emerald-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        disabled={!isEditing}
                        className="border-emerald-300"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="business">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business">Business Name</Label>
                    <Input
                      id="business"
                      placeholder="Your farm or business name"
                      disabled={!isEditing}
                      className="border-emerald-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell customers about your business..."
                      rows={4}
                      disabled={!isEditing}
                      className="border-emerald-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://..."
                      disabled={!isEditing}
                      className="border-emerald-300"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="verification">
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-emerald-900 mb-1">Verification Status</h4>
                        <p className="text-sm text-emerald-700 mb-3">
                          Your account is verified. This badge helps build trust with other users.
                        </p>
                        <Badge className="bg-blue-500">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified Account
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-emerald-900 mb-1">Premium Membership</h4>
                        <p className="text-sm text-emerald-700 mb-3">
                          Upgrade to premium to unlock advanced features and analytics.
                        </p>
                        <Button variant="outline" className="border-amber-300">
                          Upgrade Now
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-emerald-900">Required Documents</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border border-emerald-200 rounded-lg">
                        <span className="text-sm text-emerald-700">Government ID</span>
                        <Badge className="bg-green-500">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-emerald-200 rounded-lg">
                        <span className="text-sm text-emerald-700">Business License</span>
                        <Badge className="bg-green-500">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-emerald-200 rounded-lg">
                        <span className="text-sm text-emerald-700">Address Proof</span>
                        <Badge className="bg-green-500">Verified</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-900">4.8</div>
            <p className="text-sm text-emerald-600">Average Rating</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-900">156</div>
            <p className="text-sm text-emerald-600">Total Reviews</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <User className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-900">234</div>
            <p className="text-sm text-emerald-600">Connections</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-900">100%</div>
            <p className="text-sm text-emerald-600">Trust Score</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
