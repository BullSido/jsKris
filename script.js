
function on_beautify_button_click(event){
    event.preventDefault();
    let json = document.getElementById("ugly_json").value;
    if(validate_json(json)){
        json = beautify_json(json);
    }
    document.getElementById("right_block").innerText = "\n" + json + "\n\n";
}

function validate_json(json){
    return true;
}

function beautify_json(json){
    let beautified_json = "";
    let inside_quotes = false;
    let start_new_line = false;
    let character_follows_after = false;
    
    let inclusions = 0;
    for(let i = 0; i < json.length; i++){
        start_new_line = false;
        if(json[i] == '"')
            inside_quotes ^=inside_quotes;
        
        if(!inside_quotes){
            start_new_line = json[i] == ',' || json[i] == '{' || json[i] == '}';
            if(json[i] == '{'){
                inclusions++;
            }
            if(json[i] == '}'){
                inclusions--;
                character_follows_after = true;
            }
            if(json[i] == ' '){
                continue;
            }
        }

        if(!character_follows_after)
            beautified_json += json[i];
        if(start_new_line){
            beautified_json += "\n" + "\t".repeat(inclusions);
        }
        if(character_follows_after)
            beautified_json += json[i];
            
    }

    return beautified_json;
}

