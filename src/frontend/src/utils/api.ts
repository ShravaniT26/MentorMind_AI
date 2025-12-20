// Development mode - all API calls use mock data
const DEV_MODE = true;

// Mock user database for development
const mockUsers: any = {};
let mockCurrentUser: any = null;

// Generate mock user ID
function generateMockId() {
  return `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ===== AUTH API =====

export const authAPI = {
  signup: async (email: string, password: string, name: string, role: 'mentor' | 'student') => {
    const userId = generateMockId();
    mockUsers[userId] = { email, password, name, role };
    mockCurrentUser = mockUsers[userId];
    localStorage.setItem('accessToken', userId);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
    return { user: mockUsers[userId] };
  },

  signin: async (email: string, password: string) => {
    const user = Object.values(mockUsers).find((u: any) => u.email === email && u.password === password);
    if (user) {
      mockCurrentUser = user;
      localStorage.setItem('accessToken', (user as any).email);
      localStorage.setItem('userId', (user as any).email);
      localStorage.setItem('userRole', (user as any).role);
      localStorage.setItem('userName', (user as any).name);
      return { user };
    }
    throw new Error('Invalid email or password');
  },

  getCurrentUser: async () => {
    return mockCurrentUser;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  }
};

// ===== VIDEO API =====

export const videoAPI = {
  getUploadUrl: async (fileName: string, fileType: string) => {
    // Mock implementation
    return {
      uploadUrl: 'mock-upload-url',
      filePath: `videos/${fileName}`
    };
  },

  uploadMetadata: async (metadata: {
    fileName: string;
    fileSize: number;
    accessibilityMode: string;
    title?: string;
    description?: string;
  }) => {
    // Mock implementation
    return {
      success: true,
      videoId: generateMockId()
    };
  },

  getAllVideos: async () => {
    // Mock implementation
    return { videos: [] };
  },

  getVideo: async (videoId: string) => {
    // Mock implementation
    return {
      id: videoId,
      fileName: 'mock-video.mp4',
      status: 'completed'
    };
  },

  updateVideo: async (videoId: string, updates: any) => {
    // Mock implementation
    return { success: true };
  },

  deleteVideo: async (videoId: string) => {
    // Mock implementation
    return { success: true };
  },
};

// ===== EVALUATION API =====

export const evaluationAPI = {
  getEvaluation: async (videoId: string) => {
    // Mock implementation
    return {
      id: videoId,
      scores: {
        clarity: 0.85,
        engagement: 0.78,
        pace: 0.82
      }
    };
  },

  getAllEvaluations: async () => {
    // Mock implementation
    return { evaluations: [] };
  },
};

// ===== FEEDBACK API =====

export const feedbackAPI = {
  submitFeedback: async (feedback: {
    mentorId: string;
    videoId?: string;
    rating: number;
    comment: string;
    studentName?: string;
  }) => {
    // Mock implementation
    return { success: true };
  },

  getMentorFeedback: async (mentorId: string) => {
    // Mock implementation
    return { feedback: [] };
  },
};

// ===== GAMIFICATION API =====

export const gamificationAPI = {
  getBadges: async () => {
    // Mock implementation
    return { badges: [] };
  },

  getLeaderboard: async () => {
    // Mock implementation
    return { leaderboard: [] };
  },
};

// ===== DASHBOARD API =====

export const dashboardAPI = {
  getStats: async () => {
    // Mock implementation
    return {
      totalVideos: 0,
      totalViews: 0,
      avgScore: 0
    };
  },
};

// Health check
export const healthCheck = async () => {
  return { status: 'ok', mode: 'development' };
};
