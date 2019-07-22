var _ = require('underscore');

export default function (context) {
  console.log(context)
  //console.log(getSurvey().fields);
  // _.each(getTestSurvey().fields, console.log)
  context.survey = _.each(getTestSurvey().fields, function(item) {
    var tmpItem = item;

    tmpItem.field_title = "" + item.id + "_" + item.title;

    if(item.hasOwnProperty("properties")) {
      tmpItem.properties.choices = _.each(item.properties.choices, function(choice) {
          var tmpChoice = choice;
          tmpChoice.field_label = "" + item.id + "_" + choice.label;
          return tmpChoice;
      })
    }
    return tmpItem
  })
  console.log(context.survey)
  return context
}

function getSurvey() {
  return {
    "id": "nYkngh",
    "title": "Whistle",
    "theme": {
        "href": "https://api.typeform.com/themes/6lPNE6"
    },
    "workspace": {
        "href": "https://api.typeform.com/workspaces/iY5G9Y"
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
    "thankyou_screens": [
        {
            "ref": "default_tys",
            "title": "Thanks for completing this typeform\nNow *create your own* — it's free, easy, & beautiful",
            "properties": {
                "show_button": true,
                "share_icons": false,
                "button_mode": "redirect",
                "button_text": "Create a *typeform*",
                "redirect_url": "https://admin.typeform.com/powered-by?utm_campaign=nYkngh&utm_source=typeform.com-14118484-Basic&utm_medium=typeform&utm_content=typeform-thankyoubutton&utm_term=EN"
            },
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/2dpnUBBkz2VN"
            }
        }
    ],
    "fields": [
        {
            "id": "ebwu6u2Vl2ei",
            "title": "Location",
            "ref": "70b67a79-cbd5-42d6-951e-1b485ad7f006",
            "validations": {
                "required": false
            },
            "type": "short_text"
        },
        {
            "id": "VWQ6GhGLJsOW",
            "title": "What happened?",
            "ref": "c02a45a6-93e8-4329-ab3c-8673b1be949d",
            "validations": {
                "required": false
            },
            "type": "long_text"
        },
        {
            "id": "wNsKGlMaufZe",
            "title": "Gender",
            "ref": "a03a3b1e-c9d3-49cd-8b89-7f2e27e1cb2b",
            "properties": {
                "randomize": false,
                "allow_multiple_selection": false,
                "allow_other_choice": false,
                "vertical_alignment": true,
                "choices": [
                    {
                        "id": "stQTPry64tlu",
                        "ref": "31208944-3831-4929-9548-5d9cdb539d4d",
                        "label": "Male"
                    },
                    {
                        "id": "l0ZSk56MvuOi",
                        "ref": "fd0d5ce9-43ba-4e35-9cf0-d63608d57c6c",
                        "label": "Female"
                    },
                    {
                        "id": "BgU7DhdqZNrP",
                        "ref": "f0432c2a-025c-4bef-994e-87e99e115da6",
                        "label": "Non-binary"
                    },
                    {
                        "id": "onKt1hH606fl",
                        "ref": "8fa0961c-0477-4aea-8151-0ad73a75b069",
                        "label": "Other"
                    },
                    {
                        "id": "hzKLNWxxWsHe",
                        "ref": "d8e1e01a-0fcc-4292-a0a4-6ab58cd7f321",
                        "label": "Skip"
                    }
                ]
            },
            "validations": {
                "required": false
            },
            "type": "multiple_choice"
        },
        {
            "id": "dVQ0VY9scXI1",
            "title": "When?",
            "ref": "9571c441-0b33-4c10-a8e2-0ac5ae18f068",
            "properties": {
                "structure": "MMDDYYYY",
                "separator": "/"
            },
            "validations": {
                "required": false
            },
            "type": "date"
        },
        {
            "id": "v3Q81stRELhB",
            "title": "Emotions",
            "ref": "8b776453-3f08-45d5-b2d7-aed3eb84dea0",
            "properties": {
                "description": "Please select as many as you want",
                "randomize": false,
                "allow_multiple_selection": true,
                "allow_other_choice": false,
                "vertical_alignment": true,
                "choices": [
                    {
                        "id": "uPpP7byGX3D7",
                        "ref": "eabf9fa1-6fcd-4c8a-87d6-018d265b3b5c",
                        "label": "Happy"
                    },
                    {
                        "id": "e8VxR2Asxojr",
                        "ref": "4bbe49e2-d542-4e1d-a648-bb1fb91de0c4",
                        "label": "Sad"
                    },
                    {
                        "id": "ZvCH9eC2C819",
                        "ref": "51775334-d90d-4237-a64c-21225dddfed3",
                        "label": "Angry"
                    }
                ]
            },
            "validations": {
                "required": false
            },
            "type": "multiple_choice"
        }
    ],
    "_links": {
        "display": "https://whistle632914.typeform.com/to/nYkngh"
    }
}
}

function getTestSurvey() {
  return {
    "id": "nYkngh",
    "title": "Whistle",
    "theme": {
        "href": "https://api.typeform.com/themes/6lPNE6"
    },
    "workspace": {
        "href": "https://api.typeform.com/workspaces/iY5G9Y"
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
    "thankyou_screens": [
        {
            "ref": "default_tys",
            "title": "Th",
            "properties": {
                "show_button": true,
                "share_icons": false,
                "button_mode": "redirect",
                "button_text": "Create a *typeform*",
                "redirect_url": "https://admin.typeform.com/powered-by?utm_campaign=nYkngh&utm_source=typeform.com-14118484-Basic&utm_medium=typeform&utm_content=typeform-thankyoubutton&utm_term=EN"
            },
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/2dpnUBBkz2VN"
            }
        }
    ],
    "fields": [
        {
            "id": "ebwu6u2Vl2ei",
            "title": "Location",
            "ref": "70b67a79-cbd5-42d6-951e-1b485ad7f006",
            "validations": {
                "required": false
            },
            "type": "short_text"
        },
        {
            "id": "VWQ6GhGLJsOW",
            "title": "What happened?",
            "ref": "c02a45a6-93e8-4329-ab3c-8673b1be949d",
            "validations": {
                "required": false
            },
            "type": "long_text"
        },
        {
            "id": "wNsKGlMaufZe",
            "title": "Gender",
            "ref": "a03a3b1e-c9d3-49cd-8b89-7f2e27e1cb2b",
            "properties": {
                "randomize": false,
                "allow_multiple_selection": false,
                "allow_other_choice": false,
                "vertical_alignment": true,
                "choices": [
                    {
                        "id": "stQTPry64tlu",
                        "ref": "31208944-3831-4929-9548-5d9cdb539d4d",
                        "label": "Male"
                    },
                    {
                        "id": "l0ZSk56MvuOi",
                        "ref": "fd0d5ce9-43ba-4e35-9cf0-d63608d57c6c",
                        "label": "Female"
                    },
                    {
                        "id": "BgU7DhdqZNrP",
                        "ref": "f0432c2a-025c-4bef-994e-87e99e115da6",
                        "label": "Non-binary"
                    },
                    {
                        "id": "onKt1hH606fl",
                        "ref": "8fa0961c-0477-4aea-8151-0ad73a75b069",
                        "label": "Other"
                    },
                    {
                        "id": "hzKLNWxxWsHe",
                        "ref": "d8e1e01a-0fcc-4292-a0a4-6ab58cd7f321",
                        "label": "Skip"
                    }
                ]
            },
            "validations": {
                "required": false
            },
            "type": "multiple_choice"
        },
        {
            "id": "dVQ0VY9scXI1",
            "title": "When?",
            "ref": "9571c441-0b33-4c10-a8e2-0ac5ae18f068",
            "properties": {
                "structure": "MMDDYYYY",
                "separator": "/"
            },
            "validations": {
                "required": false
            },
            "type": "date"
        },
        {
            "id": "v3Q81stRELhB",
            "title": "Emotions",
            "ref": "8b776453-3f08-45d5-b2d7-aed3eb84dea0",
            "properties": {
                "description": "Please select as many as you want",
                "randomize": false,
                "allow_multiple_selection": true,
                "allow_other_choice": false,
                "vertical_alignment": true,
                "choices": [
                    {
                        "id": "uPpP7byGX3D7",
                        "ref": "eabf9fa1-6fcd-4c8a-87d6-018d265b3b5c",
                        "label": "Happy"
                    },
                    {
                        "id": "e8VxR2Asxojr",
                        "ref": "4bbe49e2-d542-4e1d-a648-bb1fb91de0c4",
                        "label": "Sad"
                    },
                    {
                        "id": "ZvCH9eC2C819",
                        "ref": "51775334-d90d-4237-a64c-21225dddfed3",
                        "label": "Angry"
                    }
                ]
            },
            "validations": {
                "required": false
            },
            "type": "multiple_choice"
        }
    ],
    "_links": {
        "display": "https://whistle632914.typeform.com/to/nYkngh"
    }
}

}
