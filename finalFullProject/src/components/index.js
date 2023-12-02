import { AuthData, AuthWrapper } from './AuthWrapper.jsx';
import {
    addPropertyMutation,
    getAgentQuery,
    getAllPropertiesQuery,
    getPropertyQuery,
    getTenantQuery,
    updateAgentMutation,
    updateTenantMutation,
    getPropertiesByAddressQuery
} from './FetchCmd.js';
import Modal from './Modal.jsx';
import RenderRoutes from './RenderRoutes.jsx';
import Slider from './Slider.jsx';
import DeleteProperty from './propertyService/DeleteProperty.jsx';
import EditProperty from './propertyService/EditProperty.jsx';
import PropertyTable from './propertyService/PropertyTable.jsx';
import AgentLogin from './userService/AgentLogin.jsx';
import AgentPostsTable from './userService/AgentPostsTable.jsx';
import DeleteTenant from './userService/DeleteTenant.jsx';
import NavUserService from './userService/NavUserService.jsx';
import TenantLogin from './userService/TenantLogin.jsx';


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
    getPropertiesByAddressQuery,
    getTenantQuery,
    updateAgentMutation,
    updateTenantMutation
};

