'use strict';

var dbm;
var type;
var seed;


/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
  exports.up = function(db: any, callback: any) {
      db.runSql(`insert into organisations (id, name, active) values (1, 'testOrg', true)`);
      db.runSql(`insert into groups (id, name, organisation_id) values (1, 'testGroup', 1)`);
      db.runSql(`insert into users (id, first_name, surname, organisation_id, role, email) values (1, 'testFirstName', 'testSecondName', 1, 'testRole', 'testEmail')`);
      db.runSql(`insert into usergroups (id, user_id, group_id) values (1, 1, 1)`);
      db.runSql(`insert into projects (id, name, organisation_id) values (1, 'TestProject', 1)`);

      // FORM
      db.runSql(`insert into subforms (id, slug, typeform_id, test_typeform_id, organisation_id, form_json, test_form_json) values (1, 'testForm', 'Bks8di', 'Bks8di', 1,'{"id":"Bks8di","title":"ghjkl","theme":{"href":"https://api.typeform.com/themes/6lPNE6"},"workspace":{"href":"https://api.typeform.com/workspaces/87352"},"settings":{"is_public":true,"is_trial":false,"language":"en","progress_bar":"proportion","show_progress_bar":true,"show_typeform_branding":true,"meta":{"allow_indexing":false}},"welcome_screens":[{"ref":"13dff694-c958-4515-878b-53768d949f2f","title":"dgdytrytryt","properties":{"show_button":true,"button_text":"Start"}}],"thankyou_screens":[{"ref":"default_tys","title":"l","properties":{"show_button":true,"share_icons":false,"button_mode":"redirect","button_text":"Create a *typeform*","redirect_url":"https://admin.typeform.com/powered-by?utm_campaign=Bks8di&utm_source=typeform.com-57031-Basic&utm_medium=typeform&utm_content=typeform-thankyoubutton&utm_term=EN"},"attachment":{"type":"image","href":"https://images.typeform.com/images/2dpnUBBkz2VN"}}],"fields":[{"id":"UlkKrBxbI2m1","title":"How good","ref":"d4b76659-b1c5-4184-b92f-00edccbdad69","properties":{"steps":11,"start_at_one":false},"validations":{"required":false},"type":"opinion_scale"},{"id":"FnkrDwaGeauK","title":"City","ref":"3447acbd-b470-4889-99ca-61636ac7901f","properties":{"randomize":false,"allow_multiple_selection":false,"allow_other_choice":false,"vertical_alignment":true,"choices":[{"id":"UNWxktK1yZgR","ref":"45598c49-3464-4eb5-a61d-efaeba712ec9","label":"A"},{"id":"bBW8e1vazOwd","ref":"37322287-6b72-4b82-9f46-357b5b72f169","label":"B"},{"id":"wZr53o7oLwwD","ref":"f8040766-371b-49e0-8ed3-5cbce46f792b","label":"C"},{"id":"ROpK3h0KJNDL","ref":"40be892f-a623-4589-a6f8-7ebcee4f06a4","label":"D"}]},"validations":{"required":false},"type":"multiple_choice"},{"id":"tXKSSANrdGW0","title":"A choice","ref":"be8e3452-e4ca-4142-84f5-4aa8f280f378","properties":{"randomize":false,"allow_multiple_selection":false,"allow_other_choice":false,"vertical_alignment":true,"choices":[{"id":"jWutiJKgmX6m","ref":"375fe641-927f-4f64-8a2c-5b8ef6dbb71a","label":"A"},{"id":"JhbG7XW9cQAW","ref":"e815cc96-6bdb-472f-83c4-483fa6ca3537","label":"B"},{"id":"flWvr0GQnY27","ref":"5c25b5c0-7c7a-4fa2-ad2d-bc7a39aa08b9","label":"C"}]},"validations":{"required":false},"type":"multiple_choice"},{"id":"kTUGCk0ROpcd","title":"Tell us","ref":"9979e48b-e482-4542-b368-0a4fe328d47d","validations":{"required":false},"type":"short_text"}],"_links":{"display":"https://tombers.typeform.com/to/Bks8di"}}', '{"id":"Bks8di","title":"ghjkl","theme":{"href":"https://api.typeform.com/themes/6lPNE6"},"workspace":{"href":"https://api.typeform.com/workspaces/87352"},"settings":{"is_public":true,"is_trial":false,"language":"en","progress_bar":"proportion","show_progress_bar":true,"show_typeform_branding":true,"meta":{"allow_indexing":false}},"welcome_screens":[{"ref":"13dff694-c958-4515-878b-53768d949f2f","title":"dgdytrytryt","properties":{"show_button":true,"button_text":"Start"}}],"thankyou_screens":[{"ref":"default_tys","title":"l","properties":{"show_button":true,"share_icons":false,"button_mode":"redirect","button_text":"Create a *typeform*","redirect_url":"https://admin.typeform.com/powered-by?utm_campaign=Bks8di&utm_source=typeform.com-57031-Basic&utm_medium=typeform&utm_content=typeform-thankyoubutton&utm_term=EN"},"attachment":{"type":"image","href":"https://images.typeform.com/images/2dpnUBBkz2VN"}}],"fields":[{"id":"UlkKrBxbI2m1","title":"How good","ref":"d4b76659-b1c5-4184-b92f-00edccbdad69","properties":{"steps":11,"start_at_one":false},"validations":{"required":false},"type":"opinion_scale"},{"id":"FnkrDwaGeauK","title":"City","ref":"3447acbd-b470-4889-99ca-61636ac7901f","properties":{"randomize":false,"allow_multiple_selection":false,"allow_other_choice":false,"vertical_alignment":true,"choices":[{"id":"UNWxktK1yZgR","ref":"45598c49-3464-4eb5-a61d-efaeba712ec9","label":"A"},{"id":"bBW8e1vazOwd","ref":"37322287-6b72-4b82-9f46-357b5b72f169","label":"B"},{"id":"wZr53o7oLwwD","ref":"f8040766-371b-49e0-8ed3-5cbce46f792b","label":"C"},{"id":"ROpK3h0KJNDL","ref":"40be892f-a623-4589-a6f8-7ebcee4f06a4","label":"D"}]},"validations":{"required":false},"type":"multiple_choice"},{"id":"tXKSSANrdGW0","title":"A choice","ref":"be8e3452-e4ca-4142-84f5-4aa8f280f378","properties":{"randomize":false,"allow_multiple_selection":false,"allow_other_choice":false,"vertical_alignment":true,"choices":[{"id":"jWutiJKgmX6m","ref":"375fe641-927f-4f64-8a2c-5b8ef6dbb71a","label":"A"},{"id":"JhbG7XW9cQAW","ref":"e815cc96-6bdb-472f-83c4-483fa6ca3537","label":"B"},{"id":"flWvr0GQnY27","ref":"5c25b5c0-7c7a-4fa2-ad2d-bc7a39aa08b9","label":"C"}]},"validations":{"required":false},"type":"multiple_choice"},{"id":"kTUGCk0ROpcd","title":"Tell us","ref":"9979e48b-e482-4542-b368-0a4fe328d47d","validations":{"required":false},"type":"short_text"}],"_links":{"display":"https://tombers.typeform.com/to/Bks8di"}}')`);

      // RESPONSES

      db.runSql(`insert into reports (response_json) values ('{"form_id":"Bks8di","token":"1cdb10914e1428399fca09d6976e2b29","landed_at":"2019-06-12T12:56:26Z","submitted_at":"2019-06-12T12:56:33Z","definition":{"id":"Bks8di","title":"ghjkl","fields":[{"id":"UlkKrBxbI2m1","title":"How good","type":"opinion_scale","ref":"d4b76659-b1c5-4184-b92f-00edccbdad69","properties":{}},{"id":"FnkrDwaGeauK","title":"City","type":"multiple_choice","ref":"3447acbd-b470-4889-99ca-61636ac7901f","properties":{},"choices":[{"id":"UNWxktK1yZgR","label":"A"},{"id":"bBW8e1vazOwd","label":"B"},{"id":"wZr53o7oLwwD","label":"C"},{"id":"ROpK3h0KJNDL","label":"D"}]},{"id":"tXKSSANrdGW0","title":"A choice","type":"multiple_choice","ref":"be8e3452-e4ca-4142-84f5-4aa8f280f378","properties":{},"choices":[{"id":"jWutiJKgmX6m","label":"A"},{"id":"JhbG7XW9cQAW","label":"B"},{"id":"flWvr0GQnY27","label":"C"}]},{"id":"kTUGCk0ROpcd","title":"Tell us","type":"short_text","ref":"9979e48b-e482-4542-b368-0a4fe328d47d","properties":{}}]},"answers":[{"type":"number","number":2,"field":{"id":"UlkKrBxbI2m1","type":"opinion_scale","ref":"d4b76659-b1c5-4184-b92f-00edccbdad69"}},{"type":"choice","choice":{"label":"A"},"field":{"id":"FnkrDwaGeauK","type":"multiple_choice","ref":"3447acbd-b470-4889-99ca-61636ac7901f"}},{"type":"choice","choice":{"label":"A"},"field":{"id":"tXKSSANrdGW0","type":"multiple_choice","ref":"be8e3452-e4ca-4142-84f5-4aa8f280f378"}},{"type":"text","text":"dsadsad","field":{"id":"kTUGCk0ROpcd","type":"short_text","ref":"9979e48b-e482-4542-b368-0a4fe328d47d"}}]}')`, callback);
  };

  exports.down = function(db: any, callback: any) {
      db.runSql(`DELETE FROM organisations WHERE id=1;`);
      db.runSql(`DELETE FROM groups WHERE id=1;`);
      db.runSql(`DELETE FROM users WHERE id=1;`);
      db.runSql(`DELETE FROM usergroups WHERE id=1;`);
      db.runSql(`DELETE FROM projects WHERE id=1;`);
      db.runSql(`DELETE FROM subforms WHERE id=1;`);
      db.runSql(`DELETE FROM reports WHERE id=1;`, callback);
  };

exports._meta = {
  "version": 1
};

function getForm() {
  return {
      "id": "Bks8di",
      "title": "ghjkl",
      "theme": {
          "href": "https://api.typeform.com/themes/6lPNE6"
      },
      "workspace": {
          "href": "https://api.typeform.com/workspaces/87352"
      },
      "settings": {
          "is_public": true,
          "is_trial": false,
          "language": "en",
          "progress_bar": "proportion",
          "show_progress_bar": true,
          "show_typeform_branding": true,
          "meta": {
              "allow_indexing": false
          }
      },
      "welcome_screens": [
          {
              "ref": "13dff694-c958-4515-878b-53768d949f2f",
              "title": "dgdytrytryt",
              "properties": {
                  "show_button": true,
                  "button_text": "Start"
              }
          }
      ],
      "thankyou_screens": [
          {
              "ref": "default_tys",
              "title": "Thanks for completing this typeform\nNow *create your own* — it's free, easy, & beautiful",
              "properties": {
                  "show_button": true,
                  "share_icons": false,
                  "button_mode": "redirect",
                  "button_text": "Create a *typeform*",
                  "redirect_url": "https://admin.typeform.com/powered-by?utm_campaign=Bks8di&utm_source=typeform.com-57031-Basic&utm_medium=typeform&utm_content=typeform-thankyoubutton&utm_term=EN"
              },
              "attachment": {
                  "type": "image",
                  "href": "https://images.typeform.com/images/2dpnUBBkz2VN"
              }
          }
      ],
      "fields": [
          {
              "id": "UlkKrBxbI2m1",
              "title": "How good",
              "ref": "d4b76659-b1c5-4184-b92f-00edccbdad69",
              "properties": {
                  "steps": 11,
                  "start_at_one": false
              },
              "validations": {
                  "required": false
              },
              "type": "opinion_scale"
          },
          {
              "id": "FnkrDwaGeauK",
              "title": "City",
              "ref": "3447acbd-b470-4889-99ca-61636ac7901f",
              "properties": {
                  "randomize": false,
                  "allow_multiple_selection": false,
                  "allow_other_choice": false,
                  "vertical_alignment": true,
                  "choices": [
                      {
                          "id": "UNWxktK1yZgR",
                          "ref": "45598c49-3464-4eb5-a61d-efaeba712ec9",
                          "label": "A"
                      },
                      {
                          "id": "bBW8e1vazOwd",
                          "ref": "37322287-6b72-4b82-9f46-357b5b72f169",
                          "label": "B"
                      },
                      {
                          "id": "wZr53o7oLwwD",
                          "ref": "f8040766-371b-49e0-8ed3-5cbce46f792b",
                          "label": "C"
                      },
                      {
                          "id": "ROpK3h0KJNDL",
                          "ref": "40be892f-a623-4589-a6f8-7ebcee4f06a4",
                          "label": "D"
                      }
                  ]
              },
              "validations": {
                  "required": false
              },
              "type": "multiple_choice"
          },
          {
              "id": "tXKSSANrdGW0",
              "title": "A choice",
              "ref": "be8e3452-e4ca-4142-84f5-4aa8f280f378",
              "properties": {
                  "randomize": false,
                  "allow_multiple_selection": false,
                  "allow_other_choice": false,
                  "vertical_alignment": true,
                  "choices": [
                      {
                          "id": "jWutiJKgmX6m",
                          "ref": "375fe641-927f-4f64-8a2c-5b8ef6dbb71a",
                          "label": "A"
                      },
                      {
                          "id": "JhbG7XW9cQAW",
                          "ref": "e815cc96-6bdb-472f-83c4-483fa6ca3537",
                          "label": "B"
                      },
                      {
                          "id": "flWvr0GQnY27",
                          "ref": "5c25b5c0-7c7a-4fa2-ad2d-bc7a39aa08b9",
                          "label": "C"
                      }
                  ]
              },
              "validations": {
                  "required": false
              },
              "type": "multiple_choice"
          },
          {
              "id": "kTUGCk0ROpcd",
              "title": "Tell us",
              "ref": "9979e48b-e482-4542-b368-0a4fe328d47d",
              "validations": {
                  "required": false
              },
              "type": "short_text"
          }
      ],
      "_links": {
          "display": "https://tombers.typeform.com/to/Bks8di"
      }
  }
}
