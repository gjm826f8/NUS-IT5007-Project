import AgentLogin from './AgentLogin.jsx';
import AgentPostsTable from './AgentPostsTable.jsx';
import { AuthData, AuthWrapper } from './AuthWrapper.jsx';
import DeleteProperty from './DeleteProperty.jsx';
import DeleteTenant from './DeleteTenant.jsx';
import EditProperty from './EditProperty.jsx';
import {
    addPropertyMutation,
    getAgentQuery,
    getAllPropertiesQuery,
    getPropertyQuery,
    getTenantQuery,
    updateAgentMutation,
    updateTenantMutation
} from './FetchCmd.js';
import Modal from './Modal.jsx';
import NavUserService from './NavUserService.jsx';
import PropertyTable from './PropertyTable.jsx';
import RenderRoutes from './RenderRoutes.jsx';
import Slider from './Slider.jsx';
import TenantLogin from './TenantLogin.jsx';

export {
    AgentLogin,
    AgentPostsTable,
    AuthData,
    AuthWrapper,
    DeleteProperty, DeleteTenant, EditProperty,
    Modal,
    NavUserService, PropertyTable, RenderRoutes,
    Slider,
    TenantLogin, addPropertyMutation,
    getAgentQuery, getAllPropertiesQuery, getPropertyQuery,
    getTenantQuery,
    updateAgentMutation,
    updateTenantMutation
};

