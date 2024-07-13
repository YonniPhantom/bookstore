import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}?q=subject:fiction&maxResults=15`);
    if (response.data && response.data.items) {
      return response.data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        synopsis: item.volumeInfo.description,
        genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Unknown',
        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
        rating: 0, // Asumiendo que la calificación será calculada internamente
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const fetchBookDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return {
      id: response.data.id,
      title: response.data.volumeInfo.title,
      description: response.data.volumeInfo.description,
      genre: response.data.volumeInfo.categories ? response.data.volumeInfo.categories[0] : 'Unknown',
      cover: response.data.volumeInfo.imageLinks ? response.data.volumeInfo.imageLinks.thumbnail : '',
      rating: 0, // Asumiendo que la calificación será calculada internamente
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};

export const login = async (email, password) => {
  try {
    // Aquí se debería hacer una llamada a tu backend para manejar la autenticación
    // Por ahora, vamos a simular un inicio de sesión exitoso
    console.log(`Iniciando sesión con email: ${email} y contraseña: ${password}`);
    return { success: true, token: 'dummy-token' }; // Simulación de éxito
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false };
  }
};

export const register = async (name, email, password) => {
  try {
    // Aquí se debería hacer una llamada a tu backend para manejar el registro
    // Por ahora, vamos a simular un registro exitoso
    console.log(`Registrando usuario con nombre: ${name}, email: ${email}, y contraseña: ${password}`);
    return { success: true, token: 'dummy-token' }; // Simulación de éxito
  } catch (error) {
    console.error('Error registering:', error);
    return { success: false };
  }
};


