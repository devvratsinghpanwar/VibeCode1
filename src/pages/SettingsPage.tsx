import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    emailUpdates: false,
    autoSave: true,
    language: 'en',
    timezone: 'UTC'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'integrations', label: 'Integrations' }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-neutral-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select 
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select 
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">Greenwich Mean Time</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoSave"
                  checked={settings.autoSave}
                  onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoSave" className="ml-2 block text-sm">
                  Enable auto-save
                </label>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <div className="space-y-2">
                  {['light', 'dark', 'system'].map((theme) => (
                    <label key={theme} className="flex items-center">
                      <input
                        type="radio"
                        name="theme"
                        value={theme}
                        checked={settings.theme === theme}
                        onChange={(e) => handleSettingChange('theme', e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 capitalize">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Email Updates</h3>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailUpdates}
                  onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Password</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Change Password
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Slack', 'Google Analytics', 'Salesforce', 'Zapier'].map((integration) => (
                  <div key={integration} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{integration}</h3>
                      <p className="text-sm text-gray-500">Not connected</p>
                    </div>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 dark:border-neutral-700 px-6 py-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
