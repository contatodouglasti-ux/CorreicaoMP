import pathlib
import re

path = pathlib.Path('relatorio.html')
text = path.read_text(encoding='utf-8')
lines = text.splitlines()

section = None
section_stack = []
new_lines = []
prop_count = 0

def normalize_section(raw):
    if not raw:
        return None
    raw = raw.strip()
    if raw.startswith('3.4.1') or raw.startswith('3.4.2'):
        return '3.4'
    # remove trailing text after first non-number/dot/letter char
    m = re.match(r'([0-9]+(?:\.[0-9]+)*(?:\.[a-z])?)', raw, re.I)
    if m:
        sec = m.group(1)
        return sec.replace('.', '_').replace('-', '_')
    return None

for line in lines:
    stripped = line.strip()
    # update current section from proposal-title or headings
    if 'class="proposal-title"' in line or re.search(r'<h[23]>\s*\d', line):
        # capture section number at start of title text
        m = re.search(r'>(\d+(?:\.\d+)*[a-z]?)', line)
        if m:
            sec = normalize_section(m.group(1))
            if sec:
                section = sec
    elif '<label>3.4.1' in line or '<label>3.4.2' in line:
        section = '3_4'
    elif '<h2>8.' in line or '<h2>9.' in line or '<h2>10.' in line or '<h2>11.' in line or '<h2>12.' in line or '<h2>13.' in line or '<h2>14.' in line or '<h2>15.' in line:
        # keep section until specific subsection appears
        pass

    # fix obvious broken radio names based on section heuristics
    if 'name="prop_43"' in line:
        if section == '2_3':
            line = line.replace('name="prop_43"', 'name="prop_2_3"')
        elif section == '2_4':
            line = line.replace('name="prop_43"', 'name="prop_2_4"')
    if 'name="prop_44"' in line:
        if section == '2_5':
            line = line.replace('name="prop_44"', 'name="prop_2_5"')
        elif section == '2_6':
            line = line.replace('name="prop_44"', 'name="prop_2_6"')
    if 'name="prop_48"' in line:
        if section == '2_10':
            line = line.replace('name="prop_48"', 'name="prop_2_10"')
        elif section == '3_2':
            line = line.replace('name="prop_48"', 'name="prop_3_2"')
        elif section == '3_2_2':
            line = line.replace('name="prop_48"', 'name="prop_3_2_2"')
        else:
            line = line.replace('name="prop_48"', 'name="prop_3_4"')
    if '<label>8.6' in line:
        section = '8_6'
    if '<label>8.7' in line:
        section = '8_7'
    if '<label>8.8' in line:
        section = '8_8'
    if '<label>8.9' in line:
        section = '8_9'
    if '<label>8.10' in line:
        section = '8_10'
    if '<label>8.11' in line:
        section = '8_11'
    if '<label>8.12' in line:
        section = '8_12'
    if '<label>8.13' in line:
        section = '8_13'
    if '<label>8.14' in line:
        section = '8_14'
    if '<label>8.15' in line:
        section = '8_15'
    if '<label>8.16' in line:
        section = '8_16'

    if 'name="prop_95"' in line and section == '8_6':
        line = line.replace('name="prop_95"', 'name="prop_96"')
    if 'name="prop_96"' in line and section == '8_7':
        line = line.replace('name="prop_96"', 'name="prop_97"')
    if 'name="prop_96"' in line and section == '8_8':
        line = line.replace('name="prop_96"', 'name="prop_98"')
    if 'name="prop_97"' in line and section == '8_9':
        line = line.replace('name="prop_97"', 'name="prop_99"')
    if 'name="prop_99"' in line and section == '8_10':
        line = line.replace('name="prop_99"', 'name="prop_100"')
    if 'name="prop_98"' in line and section == '8_11':
        line = line.replace('name="prop_98"', 'name="prop_101"')
    if 'name="prop_99"' in line and section == '8_12':
        line = line.replace('name="prop_99"', 'name="prop_102"')

    if 'name="prop_ma"' in line:
        # infer from following section number in nearby lines
        if section in {'13_1','13_2','13_3','14_1','14_2','14_3','14_4'}:
            line = line.replace('name="prop_ma"', f'name="prop_{section}"')
        elif section == '12_1':
            line = line.replace('name="prop_ma"', 'name="prop_12_1"')
        elif section == '12_2':
            line = line.replace('name="prop_ma"', 'name="prop_12_2"')
        elif section == '12_3':
            line = line.replace('name="prop_ma"', 'name="prop_12_3"')
    if 'name="prop_saude"' in line:
        if section == '12_2':
            line = line.replace('name="prop_saude"', 'name="prop_12_2"')
        elif section == '12_3':
            line = line.replace('name="prop_saude"', 'name="prop_12_3"')

    # fix 8.6/8.7/8.10 mismatched no values when section is set by label or title
    if 'prop_96" value="nao"' in line and section == '8_7':
        line = line.replace('prop_96" value="nao"', 'prop_97" value="nao"')
    if 'prop_95" value="nao"' in line and section == '8_6':
        line = line.replace('prop_95" value="nao"', 'prop_96" value="nao"')
    if 'prop_98" value="nao"' in line and section == '8_10':
        # keep as prop_100 if sim was renamed to prop_100
        line = line.replace('prop_98" value="nao"', 'prop_100" value="nao"')

    # add id to proposition textarea if missing and we have a section
    if '<label>Proposição' in line or '<label>Proposições' in line:
        next_id = None
        if section:
            next_id = f'proposicao_{section}'
        if next_id:
            new_lines.append(line)
            continue
    # if line contains textarea for proposicao with missing id
    if 'textarea class="manual-textarea auto-expand" placeholder="Digite a proposição, se necessário..."' in line and 'id="' not in line:
        prop_count += 1
        if section:
            line = line.replace('textarea class="manual-textarea auto-expand"', f'textarea id="proposicao_{section}" class="manual-textarea auto-expand"')
        else:
            line = line.replace('textarea class="manual-textarea auto-expand"', f'textarea id="proposicao_{prop_count}" class="manual-textarea auto-expand"')

    new_lines.append(line)

new_text = '\n'.join(new_lines)
path.write_text(new_text, encoding='utf-8')
print('patched relatorio.html')
