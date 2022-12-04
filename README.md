# Development

### Link to Deployed Website
https://SquishyMcsquish69.github.io/development

### Goal and Value of the Application
The goal of this app is to find guinea pigs in your area and invite them over for a playdate.

### Usability Principles Considered
You may only want to have playdates with certain genders as well as with guinea pigs that have certain fur colors. Thus, you are able to filter out these aspects of the displayed results. You may also want to see which piggies are closest to you or find a pig by their name, thus you can sort the results by distance and name!

### Organization of Components
There are two components, ItemCard and CartItem. Each is used exclusively to hold piggy data and display them on certain areas of the app. ItemCard displays all data and is affected by the filtering/sorting functions. CartItem displays only the piggy image and name in the cart when a piggy is added. It is only affected by the `addFriend` and `removeFriend` functions. There are no other components.

### How Data is Passed Down Through Components
Data is passed to components through props from `App.js`. All functionality, states, and data are stored in `App.js` and anything state that's modified by components is passed a reference to functions that modify them in `App.js`. For example, ItemCard is passed the `addFriend` function, which updates the 'friendList' state and rerendered in the cart. This function also updates the `avgDistance` of all the piggies in your cart at any one time.

### How the User Triggers State Changes
The `Add Friend` button in an ItemCard updates the `friendList` and `avgDistance` states by adding the piggy data from the ItemCard to the array and updating the new average distance. These are then rendered as `CartItem`s, which include a `Remove` button that also updates the `friendList` by removing the piggy at the current index from the list.

On change of the gender and color filters, the `genderFilter` and `colorFilter` states are updated with the category to determine which items in the `piggyList` should be displayed. On change of the sort filter, the `sortKey` state is updated, which dictates how `piggyList` items should be sorted. If this state is non-null, then any changes made by the filter functions are first sorted before updating the `piggyList` to the filtered results.
