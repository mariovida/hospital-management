type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
};

export async function fetchWithToken(url: string, options: FetchOptions = {}): Promise<any> {
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    //window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  try {
    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      return await response.json();
    } else {
      console.error('Unexpected content type:', contentType);
      throw new Error('Unexpected content type');
    }
  } catch (error) {
    console.error('Error reading response body:', error);
    throw error;
  }
}
