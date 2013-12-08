/*
 * compares two strings by finding the number of matches and number
 * of transpositions and using Jaro Distance to caluculate the similarity
 * @param s1 the first string 
 * @param s2 the second string
 * @return the Jaro Distance (a real number between 0 and 1) 0 being no match, 1 being a perfect match
 * */
var compare = function(s1, s2){

    if(!(typeof(s1) === 'string' ) || !(typeof(s2) === 'string') || !(s1.length) || !(s2.length)) return 0
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()
    var indices1 = new Array()
    var indices2 = new Array()
    
    var m = matching(s1,s2, indices1, indices2)
    if(m === 0) return 0   
    var t = transpositions(indices1,indices2) 
    var jaro = (1/3)*((m/s1.length)+(m/s2.length)+((m-t)/m))

    return jaro
}

/*
 * finds all matches of two strings and stores the matches in the passed in arrays
 * @param s1 the first string to be matched
 * @param s2 the second string to be matched
 * @param indices1 the array to store matches in the first string
 * @param indices2 the array to store matches in the second string
 * @return an integer corresponding to the number of matches
 * */
var matching = function(s1,s2, indices1, indices2){
    var d1 = s1.length
    var d2 = s2.length
    var limit = parseInt(Math.max(0,(Math.max(d1,d2)/2) - 1))
    var matches = 0
    for(var i = 0; i< d1; i++){
        for(var j = Math.max(0,i-limit); j < Math.min(i + limit + 1,d2); j++){
            if (s1[i] === s2[j] && !indices2[j]){
                indices1[i] = s1[i] 
                indices2[j] = s2[j]
                matches++
                break
            } 
        }
    }
    return matches
}

/*
 * finds the number of transpositions given two arrays of matches
 * @param indices1 the first array of matches
 * @param indices2 the second array of matches
 * @return the number of transpositions diveded by 2
 * */
var transpositions = function(indices1, indices2){
    var transpos = 0
    var j = 0
    for(var i = 0; i < indices1.length && j < indices2.length; i++){
        if(!indices1[i]) continue
        while(j < indices2.length && !indices2[j]) j++
        if(j < indices2.length && indices1[i] != indices2[j]) transpos++
        j++    
    }

    return transpos/2
}

//expose the compare function
exports.compare = compare
