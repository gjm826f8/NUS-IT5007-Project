# IT5007 - Team 20

## 1. Project Init
This project was created and tuned in a local environment. When itegrating with back-end side, we will move the whole front-end project to run in the docker.
1. `npm install`
2. `npm start`

## 2. Pages and Functions
### 2.1 Landing Page
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

### 2.2 Map-Based Search
In this projet, this is the most important function which allows user to search for rental house in a map view. We use Google Map API to show the map and mark all the properties in Singapore. In this page, there also should have a same navigation bar and search box as the landing page on the top of the website, however we can't intergrate it since the page isn's built by React. And we will fix that later!
#### 2.2.1 Filter buttom
There are three type of filter buttoms, including "All Properties", "My Favorite", "View History". And the buttons will be replaced by other designed icons afterword.
1. For "All Properties", when the users click it, it should show all the rental houses available on the map and also list their brief information in the middle parts. Notes that after we integrate the search box on this page, all properties means the whole filter results of it, not all the house data in database.
2. For "My Favorite", when the users click it, it should show all the rental houses they liked before on the map and also list their brief information in the middle parts.
3. For "View History", when the users click it, it should show all the rental houses they viewed before on the map and also list their brief information in the middle parts. And the definition of viewed is when users have clicked the houses' marker before or see the detial infomation about the houses.
#### 2.2.2 House Brief Information
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
#### 2.2.3 Marker on the map
The default status (first time you come in this page) is to show all properties on the map with the blue marker.
1. marker color
   blue: the default color of the rental house marker
   pink: means that you like this rental house
   orange: show you the rental house you are looking at on the moment
2. mouseover the marker
   it will give you a simple overview for the house, including title (condo name or address), house type, monthly rent, and number of bedrooms
3. click on marker
   it will zoom in to the place, show you the detail information about the house in the middle part and the marker turn orange at the same time
4. base operations of the map (provided by Google Map)
   left upper corner: users can choose from "Map" or "Satellite" which provide different points of view for the map
   right upper corner: user can click on the button and view the map in full screen
   right bottom corner: user can zoom in with "+" button, zoom out with "-" button, or drag the yellow human icon on the map to look what the place looks like in reality
   other operations: click and hold the left mouse button can drag to different part the map
                     scroll the mouse wheel up can zoom in to the place, scroll the mouse wheel down can zoom out from the place

### 2.3 Log In Page
Form validation is deployed. After log in, the programm will redirect you to the homepage, with the original `Log In` button been replaced by a `User Email` button (for example: `user@example.com`). This is also the entrance of 2.4 and 2.5 for tenant, or 2.6 and 2.7 for agents. 
#### 2.3.1 Log In Flow (for both Tenant and Agent)
1. Click `Log In` button, navigate to `/login` page.
2. Click the red text to switch from tenant login and agent login. (by default, tenant log in)
3. Enter the registered email, and click `Continue` button.
4. Enter the password, and click `Log In` button. If password correct, redirect to landing page. If wrong, browser will throw an alert.

#### 2.3.2 Sign Up Flow (only for Tenant)
P.S.: As Real estate agents in Singapore are required to hold a series of licenses, which dictates that there are certain tedious steps required for the vetting of agent qualifications. Therefore, an agent cannot register directly as a user of the website. If they want to register, they need to contact the staff.
1. Click `Log In` button, navigate to `/login` page.
2. Click the red text to switch from tenant login and agent login. Tenants can only register themselves under tanant log in mode.
3. Enter the new email account, and click `Continue` button.
4. After setting the password and confirming the password, click `Register and Log In` button. Then will redirect to the landing page.

#### 2.3.3 Log Out Flow
Under log in status, user can click the `User Email` button on the right-top side of the website, and click `Log Out` option to log out from the system.

### 2.4 Favorites (Tenant)

Log the properties that user clicked `Like` button. The entrance only shows after log in.

- House listing mode: The properties are shown with detailed pictures and information.
- Comparison mode: The properties are shown in a tabular way, only important information relevant to decision-making is listed above.
  
Toggle between two modes with one toggle switch shows on the right-top corner.

### 2.5 History (Tenant)
Log the properties that user viewed. The entrance only shows after log in. The properties are shown with detailed pictures and information.

### 2.6 View All Posts (Agent)
Log the properties that the current agent posted before. The entrance only shows after log in. The properties are shown with detailed pictures and information.

### 2.7 Post New (Agent)
A form that allows agent to list a new property. Form validation is deployed. 
