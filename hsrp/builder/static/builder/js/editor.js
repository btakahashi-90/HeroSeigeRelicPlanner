console.log("In the editor.js file...")

function run_filters(){
    console.log("Running filters for Description Contains: " + $("#description_filter option:selected").text() + " and Stats Inlucde: " + $("#stat_filter option:selected").text());

    // quick short circuit for both set to All
    if($("#description_filter option:selected").text() === "All" && $("#stat_filter option:selected").text() === "All"){
        // unhide all relic containers under the relic wrapper
        $("#relics_wrapper").children("div[class^='relic_container']").css("display", "");
        // don't forget to rehide the selected ones...
        hide_initial_relics();
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
            // if selected "value"/text found in description, unhide the parent container
            if(($(this).text().includes(selected_text))){
                $(this).closest("div[class^='relic_container']").css("display", "");
            }
            // else make sure it's hidden
            else{
                $(this).closest("div[class^='relic_container']").css("display", "none");
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
            // if selected "value"/text found in stat_wrapper children class list, unhide parent container
            if(($(this).children().hasClass(selected_text))){
                $(this).closest("div[class^='relic_container']").css("display", "");
            }
            // else make sure it's hidden
            else{
                $(this).closest("div[class^='relic_container']").css("display", "none");
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
                $(this).closest("div[class^='relic_container']").css("display", "");
            }
            // else make sure it's hidden
            else{
                $(this).closest("div[class^='relic_container']").css("display", "none");
            }
        })
    }
    // don't forget to rehide the selected relics...
    hide_initial_relics();
}

function add_to_build(){
    // First things first, make sure we don't have more than 30 relics.
    count = $("#build_relic_list").find("input").length;
    if(count >= 30){
        alert("Maximum Relics already added (or built with too many from Admin). Remove some relics first before trying to add more.");
        return void 0;
    }

    // hide container
    $(this).closest("div[class^='relic_container']").css("display", "none");
    // add "input" to build area
    rname = $(this).closest("div[class^='relic_container']").find(".relic_name").text();
    rid = $(this).closest(".add_to_build").attr("id");
    relic_input_html = "<div class='" + rid + "'>" + rname + " <input type='hidden' name='relic_" + rid + "' id='" + rid + "' value='" + rid + "' readonly></input><button type='button' class='" + rid + " remove'>Remove Relic</button></div>"
    $("#build_relic_list").append(relic_input_html);
    // adjust relic count
    adjust_relic_count();
    // run stat calculations
    adjust_stats();
    // bind remove from build buttons - "catch all", could use "rid" to target new button only.
    $("button.remove").off();
    $("button.remove").on("click", remove_from_build);
}

function adjust_relic_count(){
    count = $("#build_relic_list").find("input").length;
    $("#relic_count").text("Count: " + count.toString() + "/30");
}

function adjust_stats(){
    totals = {"msp": 0, "asp": 0, "str": 0, "sta": 0, "ene": 0, "arm": 0};
    $("#build_relic_list").find("input").each(function(){
        rid = $(this).attr("id");
        container = $(".relic_container_" + rid);
        stat_block = container.children(".relic_stats");
        for(key in totals){
            if(!isNaN(parseInt(stat_block.children("." + key).attr("value")))){
                totals[key] += parseInt(stat_block.children("." + key).attr("value"));
            }
        }
    })
    // since we want "custom text" we're going to go ahead and do each update separately
    // definitely not efficient, but neither is the above loop. All told this whole thing isn't super efficient but its functional.
    // an okay starting point pre-optimization
    // Update Stat Divs
    $("#increased_msp").text(totals["msp"].toString() + " Movement Speed")
    $("#increased_asp").text(totals["asp"].toString() + "% Attack Speed")
    $("#increased_str").text(totals["str"].toString() + "% Strength")
    $("#increased_sta").text(totals["sta"].toString() + "% Stamina")
    $("#increased_ene").text(totals["ene"].toString() + "% Energy")
    $("#increased_arm").text(totals["arm"].toString() + "% Armor")
}

function remove_from_build(){
    // unhide container
    $("div[class='relic_container_" + $(this).parent().attr('class') + "']").css("display", "");
    // remove "input parent" from build area
    $(this).parent().remove();
    // adjust relic count
    adjust_relic_count();
    // run stat calculations
    adjust_stats();
}

function hide_initial_relics(){
    $("#build_relic_list").find("input").each(function(){
        rid = $(this).attr("id");
        $("div[class='relic_container_" + rid + "']").css("display", "none");
    })
}

// load up functions
$("document").ready(function(){
    $("#description_filter").on("change", run_filters);
    $("#stat_filter").on("change", run_filters);
    $("button[class^='add_button']").on("click", add_to_build);
    $("button.remove").on("click", remove_from_build);
    // "fire" initial calculations
    adjust_relic_count();
    adjust_stats();
    hide_initial_relics(); // doing it the hard way...as per usual. Mostly for practice.
})