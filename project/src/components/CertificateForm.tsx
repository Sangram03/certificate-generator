import React from 'react';
import { User, Calendar, Building, Award, FileText, Users, CheckCircle2, Info } from 'lucide-react';

interface CertificateData {
  participantName: string;
  programName: string;
  organizationName: string;
  date: string;
  initiativeName: string;
  certificateType: string;
}

interface CertificateFormProps {
  data: CertificateData;
  onChange: (data: CertificateData) => void;
}

const certificateTypes = [
  'Participation',
  'Completion',
  'Achievement',
  'Excellence',
  'Recognition',
  'Merit',
  'Appreciation'
];

export const CertificateForm: React.FC<CertificateFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof CertificateData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const today = new Date().toISOString().split('T')[0];

  const isFormValid = () => {
    return (
      data.participantName.trim() !== '' &&
      data.programName.trim() !== '' &&
      data.organizationName.trim() !== '' &&
      data.date !== '' &&
      data.certificateType !== ''
    );
  };

  const getFieldError = (field: keyof CertificateData) => {
    const requiredFields: (keyof CertificateData)[] = [
      'participantName',
      'programName',
      'organizationName',
      'date',
      'certificateType'
    ];
    if (requiredFields.includes(field) && !data[field].trim()) {
      return 'This field is required';
    }
    return '';
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100 w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Certificate Details</h2>
          <p className="text-sm text-gray-500">Fill in the information to generate your certificate</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Participant Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              Participant Name *
            </label>
            <input
              type="text"
              value={data.participantName}
              onChange={(e) => handleChange('participantName', e.target.value)}
              placeholder="Enter participant's full name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base ${
                getFieldError('participantName') ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              required
            />
            {getFieldError('participantName') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError('participantName')}</p>
            )}
          </div>

          {/* Certificate Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Award className="w-4 h-4 text-blue-600" />
              Certificate Type *
            </label>
            <select
              value={data.certificateType}
              onChange={(e) => handleChange('certificateType', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base ${
                getFieldError('certificateType') ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Select certificate type</option>
              {certificateTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {getFieldError('certificateType') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError('certificateType')}</p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Program Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              Program Name *
            </label>
            <input
              type="text"
              value={data.programName}
              onChange={(e) => handleChange('programName', e.target.value)}
              placeholder="e.g., Student Ambassador Program"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base ${
                getFieldError('programName') ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              required
            />
            {getFieldError('programName') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError('programName')}</p>
            )}
          </div>

          {/* Organization Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 text-blue-600" />
              Organization Name *
            </label>
            <input
              type="text"
              value={data.organizationName}
              onChange={(e) => handleChange('organizationName', e.target.value)}
              placeholder="e.g., Google, Microsoft, etc."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base ${
                getFieldError('organizationName') ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              required
            />
            {getFieldError('organizationName') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError('organizationName')}</p>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Certificate Date *
            </label>
            <input
              type="date"
              value={data.date}
              max={today}
              onChange={(e) => handleChange('date', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base ${
                getFieldError('date') ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              required
            />
            {getFieldError('date') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError('date')}</p>
            )}
          </div>

          {/* Initiative Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Initiative Name
            </label>
            <input
              type="text"
              value={data.initiativeName}
              onChange={(e) => handleChange('initiativeName', e.target.value)}
              placeholder="e.g., Learning Initiative 2024"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Form Status */}
      <div className="mt-6">
        {isFormValid() ? (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700">
              <span className="font-medium">Ready to generate!</span> Your certificate is complete and ready for download.
            </p>
          </div>
        ) : (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-700">
              <span className="font-medium">Fill in the required fields (*)</span> to see your certificate preview update in real-time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
