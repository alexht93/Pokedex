import { createSlice } from '@reduxjs/toolkit';

// Actions:
// 1. Crear la accion en el slice
// 2. Exportar la accion
// 3. Importarla en el componente donde la utilizaremos
// 4. Importar y ejecutar useDispatch
// 5. despachamos la acción

export const userSlice = createSlice({
  name: 'user',
  initialState: " ",
  reducers: {
    changeUser: (state, action) => {
      return action.payload
    }
  }
})

export const { changeUser } = userSlice.actions;

export default userSlice.reducer;