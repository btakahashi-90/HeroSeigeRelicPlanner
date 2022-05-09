/*
    Used for search/filter (if implemented...) functionality of the relics page.
    Likely to be "ported" to a generic js to be used site wide since builds will likely also use search/filter
*/

$("#description_filter").on("change", function(){
    console.log("Selected: " + $("#description_filter option:selected").text());

    // get "text" of the selected option from dropdown, this will be used to compare to the Description "column"
    selected_text = $("#description_filter option:selected").text();

    // get all descriptions
    descriptions = $(".relic_description");

    // now we do things for EACH DESCRIPTION
    descriptions.each(function(){
        if(selected_text === "All"){
            $(this).prev(".relic_name").css("display", "");
            $(this).css("display", "");
            $(this).next(".relic_stats").css("display", "");
        }
        else{
            // if selected "value"/text found in description, unhide "previous, current, and next" DOM items (name, description, stat increases)
            if(($(this).text().includes(selected_text))){
                $(this).prev(".relic_name").css("display", "");
                $(this).css("display", "");
                $(this).next(".relic_stats").css("display", "");
            }
            // else make sure it's hidden
            else{
                $(this).prev(".relic_name").css("display", "none");
                $(this).css("display", "none");
                $(this).next(".relic_stats").css("display", "none");
            }
        }
    })
})

$("#stat_filter").on("change", function(){
    console.log("Selected: " + $("#stat_filter option:selected").text());

    // get "text" of the selected option from dropdown, this will be used to compare to the Stats "column" CLASSES
    selected_text = $("#stat_filter option:selected").val();

    // get all stat "wrappers"
    stat_wrappers = $(".relic_stats");

    // now we do things for EACH wrapper
    stat_wrappers.each(function(){
        if(selected_text === "All"){
            $(this).prev(".relic_description").prev(".relic_name").css("display", "");
            $(this).prev(".relic_description").css("display", "");
            $(this).css("display", "");
        }
        else{
            // if selected "value"/text found in stat_wrapper children class list, unhide "previous, previous, and current" DOM items (name, description, stat increases)
            if(($(this).children().hasClass(selected_text))){
                $(this).prev(".relic_description").prev(".relic_name").css("display", "");
                $(this).prev(".relic_description").css("display", "");
                $(this).css("display", "");
            }
            // else make sure it's hidden
            else{
                $(this).prev(".relic_description").prev(".relic_name").css("display", "none");
                $(this).prev(".relic_description").css("display", "none");
                $(this).css("display", "none");
            }
        }
    })
})