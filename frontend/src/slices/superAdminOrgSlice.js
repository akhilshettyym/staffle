import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSpecificOrganizationDetails } from "../api/superadmin";

export const fetchSuperAdminOrganization = createAsyncThunk(
  "superAdmin/fetchOrganization",
  async (orgId, { rejectWithValue }) => {
    try {
      const res = await getSpecificOrganizationDetails(orgId);
      return res.organization;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Error fetching organization"
      );
    }
  }
);

const superAdminOrgSlice = createSlice({
  name: "superAdminOrganization",
  initialState: {
    orgId: null,
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveOrgId: (state, action) => {
      state.orgId = action.payload;
    },
    clearActiveOrg: (state) => {
      state.orgId = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuperAdminOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuperAdminOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSuperAdminOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveOrgId, clearActiveOrg } = superAdminOrgSlice.actions;
export default superAdminOrgSlice.reducer;