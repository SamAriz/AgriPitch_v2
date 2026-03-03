import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus, Sprout, Calendar, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { mockCrops } from '../../data/mockData';

export function Crops() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500 text-white';
      case 'growing': return 'border-blue-500 text-blue-700';
      case 'harvested': return 'bg-emerald-500 text-white';
      case 'planted': return 'border-amber-500 text-amber-700';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Crop Management</h1>
          <p className="text-emerald-600 mt-1">Monitor and track your crops</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Crop
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-emerald-900">{mockCrops.length}</div>
            <p className="text-sm text-emerald-600">Total Crops</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-700">
              {mockCrops.filter(c => c.status === 'growing').length}
            </div>
            <p className="text-sm text-emerald-600">Growing</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-700">
              {mockCrops.filter(c => c.status === 'ready').length}
            </div>
            <p className="text-sm text-emerald-600">Ready to Harvest</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-emerald-900">
              {mockCrops.reduce((sum, c) => sum + c.area, 0).toFixed(1)}
            </div>
            <p className="text-sm text-emerald-600">Total Hectares</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCrops.map((crop) => (
          <Card key={crop.id} className="bg-white border-emerald-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  <div>
                    <CardTitle className="text-lg text-emerald-900">{crop.name}</CardTitle>
                    <p className="text-sm text-emerald-600">{crop.variety}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(crop.status)}>
                  {crop.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-lg space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">{crop.location} • {crop.area} hectares</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Planted: {crop.plantingDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Harvest: {crop.expectedHarvest}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {crop.healthStatus === 'excellent' && (
                  <Badge variant="outline" className="border-green-500 text-green-700 flex-1 justify-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Excellent Health
                  </Badge>
                )}
                {crop.healthStatus === 'good' && (
                  <Badge variant="outline" className="border-blue-500 text-blue-700 flex-1 justify-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Good Health
                  </Badge>
                )}
                {crop.healthStatus === 'needs-attention' && (
                  <Badge variant="outline" className="border-red-500 text-red-700 flex-1 justify-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Needs Attention
                  </Badge>
                )}
              </div>

              <Button variant="outline" className="w-full border-emerald-300">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
