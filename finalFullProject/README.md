# IT5007 - Team 20 - Course Project
[TOC]

## 1. Project Init
1. Make sure you are in the correct project folder, if not, switch the working path to `cd /course-project-team-20/finalFullProject/`
3. `npm install` to install all the dependencies.
3. Start MongoDB server using the command: `systemctl start mongod`
4. Initializing the project DB by command `mongo groupAssignment scripts/initmongo.js`
5. Run `npm run compile` to compile `index.bundle.js` file to public folder.
6. Run `npm start` to start App on port 3000.

## 2. Implemented Features
### 2.1 List of Implemented Features Overview
#### 2.1.1 UI Implementation
* Landing Page (all users)
  * Property listing with details and images
  * Search and filter by MRT, price, property type and # of bedrooms
* Map View (all users)
* Properties (all users)
  * Like/ Dislike a property for tenant users
* Log in/ Sign up (users not logged in yet)
  * Tenant login and signup
  * Agent login
  * The auth session is maintained throughout the website
* My Profile (tenants and agents)
  * Edit user profile
  * De-register tenant user
* History (tenants)
  * List of properties that tenant user have viewed
  * Tenant users can change the like status by clicking heart icon
* Favorites (tenants)
  * List of properties that tenant user likes
  * Tenant users can change the like status by clicking heart icon
* Add Property (agent)
  * Form for agents to post new property
* My Posts (agent)
  * List of properties that agent user have posted
  * Agent users can edit the details and delete property
#### 2.1.2 Back-end Implementation
##### 1. GraphQL and MongoDB
* Property Service
  * Get all properties (READ)
  * Get property (READ)
  * Add property (CREATE)
  * Update property (UPDATE)
  * Delete property (DELETE)
* Agent Service
  * Get agent (READ)
<<<<<<< HEAD
  * Get agent by ID (READ)
=======
>>>>>>> 7f0d9b80b9ef91d412aa1d73b04008607a4aa1f9
  * Update agent (UPDATE)
* Tenant Service
  * Get tenant (READ)
  * Add tenant (CREATE)
  * Update tenant (UPDATE)
  * Delete tenant (DELETE)
##### 2. 3rd Party APIs
TBD
### 2.2 Pages and Access Rights by User Type
#### 2.2.1 Guest/ Unauthenticated/ Unregistered Users
* Access landing page and map view.
* View all of the properties by clicking `Properties` placed on the top navigation bar.
* Access `Login` page by clicking the `Log in/ Sign up` button placed on the top-right corner of the page.
   * Switch `tenant`/`agent` login mode by clicking the 2 buttons placed on the top of the input field container. Validation is performed on all input fields.
   * **Agent mode:** Registration as a new agent user is not allowed, as licenses and other checks are required in the real world. The same also goes for agent deregistrations.
   * **Tenant mode:** The first step is to check for an e-mail address and continue checking for a password if the e-mail exists in the database; if not, continue with the registration.
#### 2.2.2 Logged in Tenants
*You can test this section with userEmail: `johndoe@example.com` and password: `john`*
* Access landing page and map view.
* Once logged in, tenants can click on the button with their username in the upper right corner to access all tenant-permitted features in a drop-down list.
* **Properties:** The page lists all the properties. Unlike this page in the above mode (namely 2.1.1), the user can also click the "heart" icon to change the status ("Like"/ "Dislike") of the property. 
* **Favorites:** The page lists all the properties for which the tenant user have clicked on the "heart" icon. There is a slider to toggle between a detailed listing mode with images and a comparison mode that shows only the necessary information in a table. User can also click the "heart" icon to change the status ("Like"/ "Dislike") of the property. 
* **History:** The page lists all the properties for which the tenant user has viewed. User can also click the "heart" icon to change the status ("Like"/ "Dislike") of the property. 
* **My Profile:** In this page, users can update their profile and de-register their account. Validation is performed on all input fields.
* **Log Out:** Users can log out of their accounts.
#### 2.2.3 Logged in Agents
*You can test this section with userEmail: `andrewjordan@example.org` and password: `andrew`*
* Access landing page and map view.
* **Properties:** The page lists all the properties. 
* **Add Property:** The agent user can post new property from this page. Validation is performed on all input fields.
* **My Posts**: This page lists all the properties posted by the agent user as the responsible agent. The user can also edit or delete attributes on this page.
* **My Profile:** In this page, users can update their profile. Validation is performed on all input fields.
*  **Log Out:** Users can log out of their accounts.

## 3. Page Details - Landing Page and Map View
### 3.1 Landing Page
**Navigation**: 

 - Whole Unit: click to see listing of whole unit for rent
 - Rooms: click to see rooms for rent
 - Map-Based Search: click to search properties based on map
 - Post: click to post a property
 - Login: click to login
 
**Search**: 
	
 - by MRT
 - by Price
 - by how many Bedrooms
 - by Property Type

**Listing**: 
Listing of new posts

### 3.2 Map-Based Search
In this projet, this is the most important function which allows user to search for rental house in a map view. We use Google Map API to show the map and mark all the properties in Singapore. In this page, there also should have a same navigation bar and search box as the landing page on the top of the website, however we can't intergrate it since the page isn's built by React. And we will fix that later!
#### 3.2.1 Filter buttom
There are three type of filter buttoms, including "All Properties", "My Favorite", "View History". And the buttons will be replaced by other designed icons afterword.
1. For "All Properties", when the users click it, it should show all the rental houses available on the map and also list their brief information in the middle parts. Notes that after we integrate the search box on this page, all properties means the whole filter results of it, not all the house data in database.
3. For "My Favorite", when the users click it, it should show all the rental houses they liked before on the map and also list their brief information in the middle parts.
3. For "View History", when the users click it, it should show all the rental houses they viewed before on the map and also list their brief information in the middle parts. And the definition of viewed is when users have clicked the houses' marker before or see the detial infomation about the houses.
#### 3.2.2 House Brief Information
This is the middle part of the page and it shows all the information about the properties. There are two status, one the brief information and the other one is detail information. And the default status (first time you come in this page) is to show all properties' brief information.
1. For brief infomation, it has following components:
   Information -> One Photo, Title (condo name or address), House Type, Monthly Rent, Bedrooms, Level of Floor, and Size
   Button -> Like, Share, Show on Map, Show Detail Information (they will be replaced by other designed icon afterword)
   Bottom Line -> Show users the result numbers of the housing list
   
   What happen when you click on different buttons?<br /><br />
   a. For "Like", when it is the first time you like the property, the color of the marker on the map will turn to pink which means it becomes your favorite property. If you click it again, the color of the marker turn back to blue which means it is removed from you favorite properties list.<br />
   b. For "Share", we plan to connect with social medias API and the users can post the rental house information on the platforms. For now, it is not complete yet.<br />
   c. For "Show on Map", it direct you to the place of that house on the map by using an orange marker.<br />
   d. For "Show Detail Information", it will give you all the information about that house in the same middle section.
3. For detail information, it has following components:
   Breif Information (Upper Part) -> Few photos, Title (condo name or address), House Type, Monthly Rent, Bedroom Number, Level of Floor, Size, Adress, Contact Number
   Detail Information (Lower Part) -> Few detail titles and the descriptions
   Button -> Like, Share, Go Back

   What happen when you click on different buttons?<br /><br />
   a. For "Like", the function is the same as stated before in "brief infomation" part.<br />
   b. For "Share", the function is the same as stated before in "brief infomation" part.<br />
   c. For "Go Back", when the users come to this detail information from clicking "Show Detail Information" button on brief information list, the button become visible. And they can use this button to go back to the brief information list. For instance, the user click on "My Favorite" filter button first and the middle part will show his all favorite properties' brief information. And then the user click the "Show Detail Information" button on either of any properties, the middle part displays the detail information with the "Go Back" button. Thus, the user can go back to where he came from intead of remembering what he was trying to search.
#### 3.2.3 Marker on the map
The default status (first time you come in this page) is to show all properties on the map with the blue marker.
1. marker color
   blue: the default color of the rental house marker
   pink: means that you like this rental house
   orange: show you the rental house you are looking at on the moment
3. mouseover the marker
   it will give you a simple overview for the house, including title (condo name or address), house type, monthly rent, and number of bedrooms
3. click on marker
   it will zoom in to the place, show you the detail information about the house in the middle part and the marker turn orange at the same time
4. base operations of the map (provided by Google Map)
   left upper corner: users can choose from "Map" or "Satellite" which provide different points of view for the map
   right upper corner: user can click on the button and view the map in full screen
   right bottom corner: user can zoom in with "+" button, zoom out with "-" button, or drag the yellow human icon on the map to look what the place looks like in reality
   other operations: click and hold the left mouse button can drag to different part the map
                     scroll the mouse wheel up can zoom in to the place, scroll the mouse wheel down can zoom out from the place