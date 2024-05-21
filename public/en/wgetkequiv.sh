#find . -type f -name '*.html' -print0 | xargs -0 -r sed -i.bak -e 's/$BAD/$URL/'
files=($(find . -type f -name '*.html' -print0 | xargs -0))
for j in "${!files[@]}" 
do
	echo ${files[j]}
	alllinks=($( find . -type f -wholename "${files[j]}" -print0 |  xargs -0 -r grep -ohG "https://www.gevo.cz/[^\" ]*"))
	alllinkss=($( find . -type f -wholename "${files[j]}" -print0 |  xargs -0 -r grep -ohG "../assets/[^\" ]*"))
	goodurl=($( find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r grep -ohG "https://www.gevo.cz/[^\" ]*" | sed -e 's/https:\/\/www.gevo.cz\//..\//'))
	goodurll=($( find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r grep -ohG "https://www.gevo.cz/[^\" ]*" | sed -e 's/https:\/\/www.gevo.cz\//..\//' -e "s|$|.html|" ))
	goodurlll=($( find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r grep -ohG "../assets/[^\" ]*" | sed -e 's/cs.html\//cs\//'))

	for i in "${!alllinkss[@]}"
	do	
		if [[ ${alllinks[i]} == *".png" ]] || [[ ${alllinks[i]} == *".jpg" ]] || [[ ${alllinks[i]} == *".jpeg" ]] || [[ ${alllinks[i]} == *".svg" ]] || [[ ${alllinks[i]} == *".pdf" ]] || [[ ${alllinks[i]} == *".docx" ]] || [[ ${alllinks[i]} == *".css" ]] || [[ ${alllinks[i]} == *".js" ]]
		then
			find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r sed -i.bak -e "s|${alllinks[i]}|${goodurl[i]}|"
			echo $i ${alllinks[i]} ${goodurl[i]}

		else
			find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r sed -i.bak -e "s|${alllinks[i]}|${goodurll[i]}|"
			echo $i ${alllinks[i]} ${goodurl[i]}
		fi
		
		find . -type f -wholename "${files[j]}" -print0 | xargs -0 -r sed -i.bak -e "s|${alllinkss[i]}|${goodurlll[i]}|"
		echo $i ${alllinkss[i]} ${goodurlll[i]}
	done
done





