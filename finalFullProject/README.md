# IT5007 - Team 20 - Course Project

**Contents:**
1. [Project Init](#section1)
2. [Implemented Features](#section2)
   1. [List of Implemented Features Overview](#section2.1)
      1. [UI Implementation](#section2.1.1)
      2. [Back-end Implementation](#section2.1.2)
   2. [Pages and Access Rights by User Type](#section2.2)
      1. [Guest/ Unauthenticated/ Unregistered Users](#section2.2.1)
      2. [Logged in Tenants](#section2.2.2)
      3. [Logged in Agents](#section2.2.3)
3. [Page Details - Landing Page and Map View](#section3)
   1. [Landing Page](#section3.1)
   2. [Map-Based Search](#section3.2)
4. [Details of the Project Modules Assigned to Each Team Member](#section4)


## 1. Project Init <a id='section1'></a>
1. Make sure you are in the correct project folder, if not, switch the working path to `cd /course-project-team-20/finalFullProject/`
3. `npm install` to install all the dependencies.
3. Start MongoDB server using the command: `systemctl start mongod`
4. Initializing the project DB by command `mongo groupAssignment scripts/initmongo.js`
5. Run `npm run compile` to compile `index.bundle.js` file to public folder.
6. Run `npm start` to start App on port 3000.

## 2. Implemented Features <a id='section2'></a>
### 2.1 List of Implemented Features Overview <a id='section2.1'></a>
#### 2.1.1 UI Implementation <a id='section2.1.1'></a>
* Landing Page (all users)
  * Header: As a warm welcome for users and state the intention of the website
  * Sample Property Display: Display sample properties. 
  * Property Display and Search: Display the listing of properties for rent and allow users to search properties of their interest by address, property type, bedroom number and maximum price. 
* Map Based Search (all users)
  * House Information on the left hand side
  * Google Map with Marker to show all properties in Singapore
* Properties (all users)
  * Display all properties
  * Like/ Dislike a property for tenant users
  * Get contact information for the agent in charge for tenant users
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
  * Tenant users can get contact information for the agent in charge
* Favorites (tenants)
  * List of properties that tenant user likes
  * Tenant users can change the like status by clicking heart icon
  * Tenant users can get contact information for the agent in charge
* Add Property (agent)
  * Form for agents to post new property
* My Posts (agent)
  * List of properties that agent user have posted
  * Agent users can edit the details and delete property
#### 2.1.2 Back-end Implementation <a id='section2.1.2'></a>
##### 1. GraphQL and MongoDB
* Property Service
  * Get all properties (READ)
  * Get property (READ)
  * Add property (CREATE)
  * Update property (UPDATE)
  * Delete property (DELETE)
  * Get all properties by address (READ)

* Agent Service
  * Get agent (READ)
  * Get agent by ID (READ)
  * Update agent (UPDATE)
* Tenant Service
  * Get tenant (READ)
  * Add tenant (CREATE)
  * Update tenant (UPDATE)
  * Delete tenant (DELETE)
##### 2. 3rd Party APIs
* React Google Map APIs
  * Use "GoogleMap" to show google map
  * Use "Marker" to label properties on the map
  * Use "InfoWindow" to show simple house information when the mouse is over an marker on the map
* React Share
  * Use "FacebookShareButton" to pop up a facebook post window
### 2.2 Pages and Access Rights by User Type <a id='section2.2'></a>
#### 2.2.1 Guest/ Unauthenticated/ Unregistered Users <a id='section2.2.1'></a>
* Access landing page.
* Access map based search with limited functions.
   * Can not add properties to favorite list
   * Can not add properties to view history list
* View all of the properties by clicking `Properties` placed on the top navigation bar.
* Access `Login` page by clicking the `Log in/ Sign up` button placed on the top-right corner of the page.
   * Switch `tenant`/`agent` login mode by clicking the 2 buttons placed on the top of the input field container. Validation is performed on all input fields.
   * **Agent mode:** Registration as a new agent user is not allowed, as licenses and other checks are required in the real world. The same also goes for agent deregistrations.
   * **Tenant mode:** The first step is to check for an e-mail address and continue checking for a password if the e-mail exists in the database; if not, continue with the registration.
#### 2.2.2 Logged in Tenants <a id='section2.2.2'></a>
*You can test this section with userEmail: `johndoe@example.com` and password: `john`*
* Access landing page.
* Access map based search with all functions.
* Once logged in, tenants can click on the button with their username in the upper right corner to access all tenant-permitted features in a drop-down list.
* **Properties:** The page lists all the properties. Unlike this page in the above mode (namely 2.1.1), the user can also click the "heart" icon to change the status ("Like"/ "Dislike") of the property. On change of the status, `favorites` and `history` list of `tenants` collection will be updated at the back-end. System will fetch latest data. Besides, users can get the contact information of agent in charge in a pop-up modal.
* **Favorites:** The page lists all the properties for which the tenant user have clicked on the "heart" icon. There is a slider to toggle between a detailed listing mode with images and a comparison mode that shows only the necessary information in a table. User can also click the "heart" icon to change the status ("Like"/ "Dislike") of the property. On change of the status, `favorites` and `history` list of `tenants` collection will be updated at the back-end. System will fetch latest data. Besides, users can get the contact information of agent in charge in a pop-up modal.
* **History:** The page lists all the properties for which the tenant user has viewed. User can also click the "heart" icon to change the status ("Like"/ "Dislike") of the property. On change of the status, `favorites` list of `tenants` collection will be updated at the back-end. System will fetch latest data. Besides, users can get the contact information of agent in charge in a pop-up modal.
* **My Profile:** In this page, users can update their profile and de-register their account. Validation is performed on all input fields.
* **Log Out:** Users can log out of their accounts.
#### 2.2.3 Logged in Agents <a id='section2.2.3'></a>
*You can test this section with userEmail: `andrewjordan@example.org` and password: `andrew`*
* Access landing page.
* Access map based search with limited functions.
   * Can not add properties to favorite list
   * Can not add properties to view history list
* **Properties:** The page lists all the properties. 
* **Add Property:** The agent user can post new property from this page. Validation is performed on all input fields.
* **My Posts**: This page lists all the properties posted by the agent user as the responsible agent. The user can also edit or delete properties on this page. On edition and deletion, the data will be fetched again.
* **My Profile:** In this page, users can update their profile. Validation is performed on all input fields.
*  **Log Out:** Users can log out of their accounts.

## 3. Page Details - Landing Page and Map View <a id='section3'></a>
### 3.1 Landing Page <a id='section3.1'></a>
**Navigation**: 

 - Home: Direct to landing page
 - Properties: A display of all available properties
 - Map-Based Search: Visit Map-Based Search Service
 - Login: click to login as agent or tenant
 
**Search**: 
	
 - by Address
 - by Property Type
 - by Bedroom Number
 - by Maximum Price

**Listing**: 
Listing of related Properties

### 3.2 Map-Based Search <a id='section3.2'></a>
In this projet, this is the most important function which allows user to view for rental house in a map. We use Google Map API to show the map and mark all the properties in Singapore. In this page, there is the same navigation bar as the landing page on the top of the website. On the left hand side we have house information, and on the other side of the web page we have google map.
#### 3.2.1 Filter Buttons & Sorting Dropdown Button
There are three type of filter buttons, including "All Properties", "Favorite", "History".
1. For "All Properties", when the users click it, it should show all the rental houses available on the map and also list their brief information.
3. For "Favorite", when the users click it, it should show all the rental houses they liked before on the map and also list their brief information.
3. For "History", when the users click it, it should show all the rental houses they viewed before on the map and also list their brief information. And the definition of viewed is when users have clicked the houses' marker before or see the detial infomation about the houses.

There is a sorting dropdown buttons for user to order properties in different options
1. For "Monthly Rent (Ascending)", when the users click it, it should show the rental houses list from lowest price to highest price
2. For "Monthly Rent (Descending)", when the users click it, it should show the rental houses list from highest price to lowest price
3. For "Area/Size (Ascending)", when the users click it, it should show the rental houses list from smallest size to greatest size
4. For "Area/Size (Descending)", when the users click it, it should show the rental houses list from greatest size to smallest size
#### 3.2.2 House Brief Information
This is the left part of the page and it shows all the information about the properties. There are two status, one the brief information and the other one is detail information. And the default status (first time you come in this page) is to show all properties' brief information.
1. For brief infomation, it has following components:
   Upper Line -> Show users the result numbers of the housing list
   Information -> One Photo, Title (condo name or address), House Type, Monthly Rent, Bedrooms, Bathrooms, and Size
   Button -> Show Detail Information, Show on Map, Like, Share
   
   What happen when you click on different buttons?<br /><br />
   a. For "Show Detail Information", it will give you all the information about that house in the same window.<br />
   b. For "Show on Map", it direct you to the place of that house on the map by using an orange marker.<br />
   c. For "Like", when it is the first time you like the property, it will store the properties to your favorite list. If you click it again, it will remove from you favorite properties list.<br />
   d. For "Share", it will connect to social medias API (Facebook) and the users can post the rental house information on the platforms. Since this project is implemented on local machine, we can not attach our actual url to the post, we use and dummy url instead.
3. For detail information, it has following components:
   Breif Information (Upper Part) -> Few photos, Title (condo name or address), House Type, Monthly Rent, Bedroom Number, Bathroom Number, Size, Postal Code
   Detail Information (Lower Part) -> Few detail titles and the descriptions
   Button -> Like, Share, Go Back

   What happen when you click on different buttons?<br /><br />
   a. For "Like", the function is the same as stated before in "brief infomation" part.<br />
   b. For "Share", the function is the same as stated before in "brief infomation" part.<br />
   c. For "Go Back", the user can use this button to go back to the brief information list. For instance, the user click on "Favorite" filter button first and the left part will show his/her all favorite properties' brief information. And then the user click the "Show Detail Information" button on either of any properties, the left part displays the detail information with the "Go Back" button. Thus, the user can go back to where he came from intead of remembering what he was trying to search.
#### 3.2.3 Marker on the map
The default status (first time you come in this page) is to show all properties on the map with the blue marker.
1. marker color
   blue: the default color of the rental house marker
   orange: show you the rental house you are looking at on the moment
3. mouseover the marker
   it will give you a simple overview for the house, including title (condo name or address), house type, monthly rent, number of bedrooms, and number of bathrooms
3. click on marker
   it will zoom in to the place, show you the detail information about the house in the left part and the marker turn orange at the same time
4. base operations of the map (provided by Google Map)
   left upper corner: users can choose from "Map" or "Satellite" which provide different points of view for the map
   right upper corner: user can click on the button and view the map in full screen
   right bottom corner: user can zoom in with "+" button, zoom out with "-" button, or drag the yellow human icon on the map to look what the place looks like in reality
   other operations: click and hold the left mouse button can drag to different part the map
                     scroll the mouse wheel up can zoom in to the place, scroll the mouse wheel down can zoom out from the place

## 4. Details of the Project Modules Assigned to Each Team Member <a id='section4'></a>

<div class='center'>
  <table>
    <tr>
      <th>Name</th>
      <th>Tasks</th>
    </tr>
    <tr>
      <td>JIANG XINDOU</td>
      <td>
        <br />
        <b>UI Pages</b><br />
        - Landing Page<br />
        <br />   
        <b>MongoDB and GraphQL</b><br />
        - get properties by address<br />
        <b>APIs Implementation</b><br />
              - Search Property by Address<br />
              - Search Property by Property Type<br />
              - Search Property by Bedroom Number<br />
              - Search Property by Maximum Price<br />
      </td>
    </tr>
    </tr>
    <tr>
      <td>LI YUELING</td>
      <td>
        - Project environment setting<br />
        <br />
        <b>UI Pages</b><br />
        - View all properties in table format page<br />
        - Login& register page<br />
        - Show, edit& update profile, deregister page<br />
        - Agent view all posts, edit/delete property page<br />
        - Agent add new property page <br />
        - Tenant show& update history page<br />
        - Tenant show& update favorites page<br />
        <br />   
        <b>MongoDB and GraphQL</b><br />
        - get all properties<br />
        - get property<br />
        - add property<br />
        - update property<br />
        - delete property<br />
        - get agent<br />
        - get agent by id<br />
        - update agent<br />
        - get tenant<br />
        - add tenant<br />
        - update tenant<br /> 
        - delete tenant<br />
      </td>
    </tr>
    <tr>
      <td>LIAO YUEH FAN</td>
      <td>
	<b>UI Pages</b><br />
        - Map based search<br />
	<b>APIs implementation</b><br />
        - Google Map APIs<br />
        - React Share APIs<br />
      </td>
    </tr>
  </table>
</div>
