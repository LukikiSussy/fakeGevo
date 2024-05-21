#find . -type f -name '*.html' -print0 | xargs -0 -r sed -i.bak -e 's/$BAD/$URL/'
files=($(find . -type f -name '*.html' -print0 | xargs -0))
for j in "${!files[@]}"
do
        alllinks=($( find . -type f -wholename "${files[j]}" -print0 |  xargs -0 -r grep -ohG "https://www.gevo.cz/[^\" ]*"))
        alllinkss=($( find . -type f -wholename "${files[j]}" -print0 |  xargs -0 -r grep -ohG "../en[^\" ]*"))
        goodurl=($( find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r grep -ohG "https://www.gevo.cz/[^\" ]*" | sed -e 's/https:\/\/www.gevo.cz\//..\//'))


        goodurll=$( find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r grep -ohF '>Kontakty</span></a></li></ul></div></li>' | sed -e "s|$|<li class=\"nav__item has-children\"><a href=\"dotaznik.html\" class=\"nav__link \"><span class=\"nav__label\">K Vyplnění</span></a></li>|" )
        goodurlll=($( find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r grep -ohG "../en[^\" ]*" | sed -e 's/en.html\//en\//'))
	alplaces=($( find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r grep -ohF '>Kontakty</span></a></li></ul></div></li>'))	
	 
        for i in "${!alplaces[@]}"
        do
                #if [[ ${alllinks[i]} == *".png" ]] || [[ ${alllinks[i]} == *".jpg" ]] || [[ ${alllinks[i]} == *".jpeg" ]] || [[ ${alllinks[i]} == *".svg" ]] || [[ ${alllinks[i]} == *".pdf" ]] || [[ ${alllinks[i]} == *".docx" ]] || [[ ${alllinks[i]} == *".css" ]] || [[ ${alllinks[i]} == *".js" ]]
                #then
                #        find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r sed -i.bak -e "s|${alllinks[i]}|${goodurl[i]}|"
                #        echo $i ${alllinks[i]} ${goodurl[i]}

                #else
                #        find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r sed -i.bak -e "s|${alllinks[i]}|${goodurll[i]}|"
                #        echo $i ${alllinks[i]} ${goodurl[i]}
                #fi

#        done
         find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r sed -i.bak -e "s|${alplaces[i]}|${goodurll[i]}|"
	echo $j ${alplaces[i]} ${goodurll[i]}
	done
done

