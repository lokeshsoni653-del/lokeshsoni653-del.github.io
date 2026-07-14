import re
from bs4 import BeautifulSoup

with open('projects.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# Match only the project-card wrapper divs
cards_raw = soup.find_all('div', class_='project-card')
print(f"BeautifulSoup matched {len(cards_raw)} project card elements")

parsed_projects = []
for card in cards_raw:
    # 1. Title
    title_el = card.find(class_='project-card__title')
    title = title_el.get_text().strip() if title_el else ""
    
    if "thesis" in title.lower():
        continue
        
    # 2. Emoji
    emoji_el = card.find(class_='project-card__emoji')
    emoji = emoji_el.get_text().strip() if emoji_el else "🚀"
    
    # 3. Company
    company_el = card.find(class_='project-card__company')
    company = company_el.get_text().strip() if company_el else ""
    
    # 4. Num
    num_el = card.find(class_='project-card__num')
    num = num_el.get_text().strip() if num_el else ""
    
    # 5. Story
    story_el = card.find(class_='project-card__story')
    story = story_el.get_text().strip() if story_el else ""
    
    # 6. Description
    desc_el = card.find(class_='project-card__desc')
    desc = desc_el.get_text().strip() if desc_el else ""
    
    # 7. Tech Tags
    tags = []
    tags_row = card.find(class_='tags-row')
    if tags_row:
        tags = [tag.get_text().strip() for tag in tags_row.find_all('span')]
        
    # 8. Action Link
    action_url = "#"
    actions = card.find(class_='project-card__actions')
    if actions:
        link_el = actions.find('a')
        if link_el and link_el.has_attr('href'):
            action_url = link_el['href']
            
    cat_attr = card.get('data-category', '')
    
    parsed_projects.append({
        'title': title,
        'emoji': emoji,
        'company': company,
        'num': num,
        'story': story,
        'desc': desc,
        'tags': tags,
        'url': action_url,
        'raw_cat': cat_attr
    })

print(f"Successfully parsed {len(parsed_projects)} projects.")
