<template>
  <div>
    <h1>Hello</h1>
    <form action="/store" class="v-form">
    <template v-for="item in survey">

      <!-- Short Text -->
        <div v-if="item.type == 'short_text'" class="v-text-field__slot">
          <p>{{item.title}}</p>
          <input type="text" :name="item.field_title" style="border:1px solid red">
        </div>

      <!-- Short Text -->
        <div v-if="item.type == 'long_text'" class="v-text-field__slot">
          <p>{{item.title}}</p>
          <textarea rows="4" cols="50" :name="item.field_title" style="border:1px solid red"></textarea>
        </div>

      <!-- Multiple Choice -->
        <div v-else-if="item.type == 'multiple_choice'" class="v-text-field__slot">
          <p>{{item.title}}</p>
          <template v-for="option in item.properties.choices">
              <input v-if="item.properties.allow_multiple_selection == true" type="checkbox" :id="option.label" :name="option.field_label" style="border:1px solid red">
              <input v-else type="radio" :id="option.label" :name="option.field_label" style="border:1px solid red">
              <label :for="option.label">{{ option.label }}</label>
          </template>

        </div>

        <!-- Opinion scale -->
        <div v-else-if="item.type == 'opinion_scale'" class="v-text-field__slot">
          <p>{{item.title}}</p>
          <template v-for="option in [1,2,3,4,5]">
              <input type="radio" :id="option" :name="item.field_title" style="border:1px solid red">
              <label :for="option">{{ option }}</label>
          </template>
        </div>

        <!-- date -->
        <div v-else-if="item.type == 'date'" class="v-text-field__slot">
          <p>{{item.title}}</p>
          <input type="date" :name="item.field_title" style="border:1px solid red">
        </div>

      </template>
      <input type="submit" value="Submit">
    </form>
</div>
</template>

<script>
export default {
  asyncData (context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    // console.log(context)
    return { survey: context.survey }
  },
  fetch () {
    // The `fetch` method is used to fill the store before rendering the page
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover

}
</script>
