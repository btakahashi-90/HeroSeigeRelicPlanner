/*
    Used for search/filter (if implemented...) functionality of the relics page.
    Likely to be "ported" to a generic js to be used site wide since builds will likely also use search/filter
*/

function run_filters(){
    console.log("Running filters for Description Contains: " + $("#description_filter option:selected").text() + " and Stats Inlucde: " + $("#stat_filter option:selected").text());

    // quick short circuit for both set to All
    if($("#description_filter option:selected").text() === "All" && $("#stat_filter option:selected").text() === "All"){
        // unhide everything under the relics wrapper
        $("#relics_wrapper").children().css("display", "");
        // get out
        return void 0;
    }

    // Need to know if we're running them together (both !== "All") or separately (one === "All")
    // The following cases are possible: Description !== All && Stats === All, Description === All && Stats !== All, Description && Stats !== All
    // since we made it this far, we know both !== All, so just run it I guess?
    if($("#description_filter option:selected").text() !== "All" && $("#stat_filter option:selected").text() === "All"){
        // only filtering on description, stats currently set to all
        // get "text" of the selected option from dropdown, this will be used to compare to the Description "column"
        selected_text = $("#description_filter option:selected").text();

        // get all descriptions
        descriptions = $(".relic_description");

        // now we do things for EACH DESCRIPTION
        descriptions.each(function(){
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
        })
    }
    else if($("#description_filter option:selected").text() === "All" && $("#stat_filter option:selected").text() !== "All"){
        // only filtering on stats, description currently set to all
        // get "val" of the selected option from dropdown, this will be used to compare to the Stats "column" CLASSES
        selected_text = $("#stat_filter option:selected").val();

        // get all stat "wrappers"
        stat_wrappers = $(".relic_stats");

        // now we do things for EACH wrapper
        stat_wrappers.each(function(){
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
        })
    }
    else{
        // filtering on both, because description is in the "middle" we'll work with that so we don't have to chain calls to prev.
        // get "text" of the selected option from dropdown, this will be used to compare to the Description "column"
        description_text = $("#description_filter option:selected").text();
        // get "val" of the selected option from dropdown, this will be used to compare to the Stats "column" CLASSES
        stats_text = $("#stat_filter option:selected").val();
        // get all descriptions, we don't need the stats wrapper. We'll grab that with "next"
        descriptions = $(".relic_description");
        // now we do things for EACH DESCRIPTION
        descriptions.each(function(){
            // if selected "value"/text found in description AND relic_stats children contain the appropriate class
            if(($(this).text().includes(description_text)) && ($(this).next(".relic_stats").children().hasClass(stats_text))){
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
        })
    }
}

// load up functions
$("document").ready(function(){
    $("#description_filter").on("change", run_filters);
    $("#stat_filter").on("change", run_filters);
})