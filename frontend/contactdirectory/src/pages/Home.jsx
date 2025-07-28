import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Mail, Phone, Edit3, Trash2, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // Fetch contacts from backend
  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/contacts");
      setContacts(response.data.data); // assuming ApiResponse structure
    } catch (error) {
      console.error("Failed to fetch contacts:", error.message);
    }
  };

  // On component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id)); // Update UI
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/add");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Contact Directory</h1>
                <p className="text-gray-400 mt-1">{contacts.length} contacts in your network</p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {contacts.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-800 rounded-full inline-block mb-4">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No contacts yet</h3>
            <p className="text-gray-500 mb-6">Start building your network by adding your first contact</p>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add First Contact</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div key={contact._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-xl group">
                {/* Avatar */}
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">{contact.name}</h3>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <Mail className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-sm truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{contact.number}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(contact._id)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
