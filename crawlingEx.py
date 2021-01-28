from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import datetime
import json
import sys
from time import sleep

options = webdriver.ChromeOptions()
options.add_argument('headless')

getColor = sys.argv[1]

# executable_path에는 chromedriver 실행 파일의 경로를 넣고, chrome_options에는 options 변수를 넣습니다.
driver = webdriver.Chrome(executable_path='/home/ubuntu/newdir/madcampWeek4_server/chromedriver', options=options)
driver.get('https://htmlcolorcodes.com/color-picker/')
sleep(1)
myColor = driver.find_element_by_xpath('//*[@id="js-picker"]/div[3]/div[2]/input')
driver.implicitly_wait(1)
for i in range(6): myColor.send_keys(Keys.BACKSPACE)
myColor.send_keys(getColor)

blank = driver.find_element_by_xpath('//*[@id="picker"]')
driver.implicitly_wait(1)
blank.click()

color1 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[2]/div[2]/h4[1]')
color2 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[3]/div[2]/h4[1]')
color3 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[4]/div[2]/h4[1]')
color4 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[5]/div[2]/h4[1]')
color5 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[6]/div[2]/h4[1]')
driver.implicitly_wait(1)
print(color1.text)
print(color2.text)
print(color3.text)
print(color4.text)
print(color5.text)
driver.quit()