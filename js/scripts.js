$(document).ready(function () {

const url = "https://randomuser.me/api/?results=12&nat=us&exc=gender,registered,phone,id,nat&callback=?";

$.getJSON(url, function (data) {
    for (let i = 0; i < data.results.length; i++) {
        const prev = (i - 1);
        const $userHTML = $(`
            <div class="col-md-6 col-lg-4">
                <div id="user${i}" class="card mb-4" data-toggle="modal" data-target="#modal${i}">
                    <div class="row align-items-center">
                        <div class="col img-col py-3 px-0">
                            <img class="mx-auto d-block" src="${data.results[i].picture.medium}" alt="profile picture">
                        </div>
                        <div class="col py-3 px-0">
                            <h4 class="card-title caps m-0 pb-1"><strong>${data.results[i].name.first} ${data.results[i].name.last}</strong></h4>
                            <p class="card-text m-0 pb-1">${data.results[i].email}</p>
                            <p class="card-text caps m-0">${data.results[i].location.city}, ${data.results[i].location.state}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
        const $modalHTML = $(`
            <div class="modal fade" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="ModalWindow" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="card text-center">
                        <div>
                            <button type="button" class="close pr-2" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body modal-top mx-5 py-2 px-5">
                            <img class="pb-3" src="${data.results[i].picture.large}" alt="profile picture">
                            <h4 class="card-title caps m-0 pb-1"><strong>${data.results[i].name.first} ${data.results[i].name.last}</strong></h4>
                            <p class="card-text m-0 pb-1">${data.results[i].email}</p>
                            <p class="card-text m-0 pb-3">${data.results[i].login.username}</p>
                        </div>
                        <div class="modal-body mb-4 py-2 px-5">
                            <p class="card-text m-0 pt-3 pb-1">${data.results[i].cell}</p>
                            <p class="card-text m-0 pb-1 caps">${data.results[i].location.street} ${data.results[i].location.city}, ${data.results[i].location.state}</p>
                            <p class="card-text">Birthday: ${data.results[i].dob.slice(5, 7)}/${data.results[i].dob.slice(8, 10)}/${data.results[i].dob.slice(2, 4)}</p>
                        </div>
                        <row>
                            <button type="button" id="prev"  class="btn btn-secondary" data-toggle="modal" data-target="#modal${i - 1}">Prev</button>
                            <button type="button" id="next" class="btn btn-secondary" data-toggle="modal" data-target="#modal${i + 1}">Next</button>
                        </row>
                    </div>
                </div>
            </div>
        `);
        console.log(prev);
        // $("#prev").click(function() {
        //     console.log("click event!")
        //     $("#modal${i}").modal("hide");
        //     $("#modal${prev}").modal("show");
            
        // });

        $(".users").append($userHTML);
        $(".users").append($modalHTML);
    }




});



});
