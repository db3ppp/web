from selenium  import webdriver
from bs4 import BeautifulSoup
path = "/Users/kimhyewon/Downloads/chromedriver"

#selenium으로 제어할수있는 browser 띄우기
driver = webdriver.Chrome(path)
driver.get("https://hisnet.handong.edu/login/login.php")

#assert "hisnet" in driver.title

#login
driver.find_element_by_name('id').send_keys('db3p')
driver.find_element_by_name('password').send_keys('98gpdnjsdl')
driver.find_element_by_xpath('//input[@ src="/2012_images/intro/btn_login.gif"]').click()

#학사정보 들어가기
driver.get('http://hisnet.handong.edu/haksa/hakjuk/HHAK110M.php')
#driver.find_element_by_xpath('//input[@ src="/2012_images/public/tmenu6.jpg"]').click()

#html = driver.page_source
#soup = BeautifulSoup(html, 'html.parser')
#major = soup.select('td.tblcationTitlecls')
#major = soup.select(/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[2]/td[2])
#for n in major:
#    print(n.text.strip())


name = driver.find_element_by_xpath("/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[1]/td[2]")
print(name.text)
studentNum = driver.find_element_by_xpath("/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[2]/td[2]")
print(studentNum.text)
major = driver.find_element_by_xpath("/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[6]/td[2]")
print(major.text)
