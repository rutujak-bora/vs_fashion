import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import useStore from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function CollectionManagement() {
  const { token } = useStore();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    is_active: true
  });

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${API}/collections`);
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API}/collections/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Collection updated successfully');
      } else {
        await axios.post(`${API}/collections`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Collection created successfully');
      }

      setDialogOpen(false);
      resetForm();
      fetchCollections();
    } catch (error) {
      toast.error('Failed to save collection');
    }
  };

  const handleEdit = (collection) => {
    setEditingId(collection.id);
    setFormData({
      name: collection.name,
      description: collection.description,
      image_url: collection.image_url,
      is_active: collection.is_active
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this collection?')) return;

    try {
      await axios.delete(`${API}/collections/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Collection deleted successfully');
      fetchCollections();
    } catch (error) {
      toast.error('Failed to delete collection');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image_url: '',
      is_active: true
    });
    setEditingId(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
          Collection Management
        </h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              data-testid="add-collection-btn"
              onClick={resetForm}
              className="bg-[#4A2836] hover:bg-[#5A3846] flex items-center gap-2"
            >
              <Plus size={16} /> Add Collection
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Collection' : 'Add New Collection'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Collection Name *</Label>
                <Input
                  id="name"
                  data-testid="collection-name-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  data-testid="collection-description-input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL (optional)</Label>
                <Input
                  id="image_url"
                  data-testid="collection-image-input"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  data-testid="collection-active-checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <Button
                type="submit"
                data-testid="save-collection-btn"
                className="w-full bg-[#C4969C] hover:bg-[#B4848F]"
              >
                {editingId ? 'Update' : 'Create'} Collection
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {collections.length > 0 ? (
                collections.map((collection) => (
                  <tr key={collection.id} data-testid={`collection-row-${collection.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">{collection.name}</td>
                    <td className="px-6 py-4">{collection.description || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded ${
                        collection.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {collection.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        data-testid={`edit-collection-${collection.id}`}
                        onClick={() => handleEdit(collection)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        data-testid={`delete-collection-${collection.id}`}
                        onClick={() => handleDelete(collection.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No collections yet. Create your first collection!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
