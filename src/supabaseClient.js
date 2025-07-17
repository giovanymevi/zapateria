import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Función para obtener productos destacados
export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('destacado', true)
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data
}

// Función para obtener todas las categorías
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return data
}

// Función para obtener productos por categoría
export const getProductsByCategory = async (categoryId) => {
  if (categoryId === 'todos') {
    return getFeaturedProducts()
  }
  
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('categoria_id', categoryId)
  
  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
  
  return data
}

// Función para obtener testimonios
export const getTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonios')
    .select('*')
    .limit(3)
  
  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  
  return data
}

// Función para crear un nuevo pedido
export const createOrder = async (userId, items) => {
  // Calcular el total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Crear el pedido
  const { data: order, error: orderError } = await supabase
    .from('pedidos')
    .insert([{ usuario_id: userId, total }])
    .select()
  
  if (orderError) {
    console.error('Error creating order:', orderError)
    return null
  }
  
  // Crear detalles del pedido
  const orderDetails = items.map(item => ({
    pedido_id: order[0].id,
    producto_id: item.id,
    cantidad: item.quantity,
    precio_unitario: item.price
  }))
  
  const { error: detailsError } = await supabase
    .from('detalles_pedido')
    .insert(orderDetails)
  
  if (detailsError) {
    console.error('Error adding order details:', detailsError)
    return null
  }
  
  return order[0].id
}

// Funciones de autenticación
export const signInWithEmail = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  return { user, error }
}

export const signUpWithEmail = async (email, password, name) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name
      }
    }
  })
  
  return { user, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = () => {
  return supabase.auth.getUser()
}