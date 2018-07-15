$(document).ready(function () {

    const url = "https://randomuser.me/api/?results=12&nat=us&exc=gender,registered,phone,id,nat&callback=?";

    // loads the JSON encoded data
    $.getJSON(url, function (data) {
        for (let i = 0; i < data.results.length; i++) {
            // creates HTML elements for basic employee cards
            const $userHTML = $(`
                <div class="user col-md-6 col-lg-4">
                    <div id="user${i}" class="card mb-4" data-toggle="modal" data-target="#modal${i}">
                        <div class="row align-items-center">
                            <div class="col img-col py-3 px-0">
                                <img class="mx-auto d-block" src="${data.results[i].picture.medium}" alt="profile picture">
                            </div>
                            <div class="col py-3 px-0">
                                <h4 id="name" class="card-title caps m-0 pb-1"><strong>${data.results[i].name.first} ${data.results[i].name.last}</strong></h4>
                                <p id="username" class="d-none">${data.results[i].login.username}</p>
                                <p class="card-text m-0 pb-1">${data.results[i].email}</p>
                                <p class="card-text caps m-0">${data.results[i].location.city}, ${data.results[i].location.state}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            // creates HTML elements for modal windows
            const $modalHTML = $(`
                <div class="modal fade" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="ModalWindow" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content card text-center">
                            <div class="modal-header">
                                <button type="button" class="close pr-2" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body modal-top mx-5 py-2 px-5">
                                <img class="pb-3" src="${data.results[i].picture.large}" alt="profile picture">
                                <h4 class="card-title caps m-0 pb-1"><strong>${data.results[i].name.first} ${data.results[i].name.last}</strong></h4>
                                <p class="card-text m-0 pb-1">${data.results[i].email}</p>
                                <p id="username" class="card-text m-0 pb-3">${data.results[i].login.username}</p>
                            </div>
                            <div class="modal-body mb-4 py-2 px-5">
                                <p class="card-text m-0 pt-3 pb-1">${data.results[i].cell}</p>
                                <p class="card-text m-0 pb-1 caps">${data.results[i].location.street}, ${data.results[i].location.city}, ${data.results[i].location.state}, ${data.results[i].location.postcode}</p>
                                <p class="card-text">Birthday: ${data.results[i].dob.date.slice(5, 7)}/${data.results[i].dob.date.slice(8, 10)}/${data.results[i].dob.date.slice(2, 4)}</p>
                            </div>
                            <row class="mb-3">
                                <button type="button" id="prev" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" data-target="#modal${i - 1}">Prev</button>
                                <button type="button" id="next" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" data-target="#modal${i + 1}">Next</button>
                            </row>
                        </div>
                    </div>
                </div>
            `);

            $(".user-section").append($userHTML);
            $(".modal-section").append($modalHTML);
        }
    });
    // creates HTML elements for search bar
    const $searchHTML = $(`
        <div class="mt-3 mb-3 px-3">
            <input id="input" placeholder="Search name or username...">
        </div>
    `);

    $("header").append($searchHTML);

    // creates a keyup event handler on the input field
    $("#input").keyup(function () {
        // stores the user's search criteria in a variable
        let $searchValue = $("#input").val().toLowerCase();
        // will be set to true if search term matches employee list
        let match = false;

        // removes element with a class of message
        $(".message").remove();

        // loops through children of .user-section
        for (let i = 0; i < $(".user-section").children().length; i++) {
            // stores employee names and usernames in variables
            let $name = $(".user-section #name").eq(i).text();
            let $username = $(".user-section #username").eq(i).text();

            // adds class of true to .user if search term is detected or removes it if it isn't
            if ($name.toLowerCase().includes($searchValue) || $username.includes($searchValue)) {
                match = true;
                $(".user-section #name").eq(i).closest(".user").addClass("true");
            } else {
                $(".user-section #name").eq(i).closest(".user").removeClass("true");
            }
        }

        // Checks search results and responds based on the outcome
        if (match === true) {
            // hides elements that do not match search term
            $(".user-section .user").not(".true").hide();
        }
        if (match === false) {
            // creates a message and adds it to the DOM
            let $message = $("<p class='message px-3'>No employees were found with that name or username.</p>");

            // hides user section and appends message
            $(".user-section .user").hide();
            $(".user-section").append($message).show();
        }
        if ($searchValue === "") {
            // removes element with a class of message
            $(".message").remove();
            // shows original employee list
            $(".user-section .user").show();
        }
    });

});
