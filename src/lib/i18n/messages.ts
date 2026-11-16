export const locales = ['be', 'ru', 'en'] as const;

export type Locale = (typeof locales)[number];

export type Messages = {
	metaDescription: string;
	langLabel: string;
	themeLabel: string;
	themeLight: string;
	themeDark: string;
	themeWinter: string;
	brand: string;
	title: string;
	lede: string;
	aboutTitle: string;
	aboutBody1: string;
	aboutBody2: string;
};

export const messages: Record<Locale, Messages> = {
	ru: {
		metaDescription:
			'Николай — уникальные именные скидки. Пока только для людей с именем Николай и только с паспортом Республики Беларусь.',
		langLabel: 'Язык',
		themeLabel: 'Тема',
		themeLight: 'Светлая',
		themeDark: 'Тёмная',
		themeWinter: 'Зимняя',
		brand: 'Николай',
		title: 'Уникальные именные скидки',
		lede: 'Пока только для людей с именем Николай, и только с паспортом Республики Беларусь. Остальные страны в работе.',
		aboutTitle: 'О приложении',
		aboutBody1:
			'Николай связывает скидку с именем. Не общая акция для всех — персональное предложение для конкретного имени.',
		aboutBody2:
			'Сейчас доступ открыт людям с именем Николай и паспортом гражданина Республики Беларусь. Остальные страны в работе. Регистрация появится позже.'
	},
	be: {
		metaDescription:
			'Мікалай — унікальныя іменныя зніжкі. Пакуль толькі для людзей з імем Мікалай і толькі з пашпартам Рэспублікі Беларусь.',
		langLabel: 'Мова',
		themeLabel: 'Тэма',
		themeLight: 'Светлая',
		themeDark: 'Цёмная',
		themeWinter: 'Зімовая',
		brand: 'Мікалай',
		title: 'Унікальныя іменныя зніжкі',
		lede: 'Пакуль толькі для людзей з імем Мікалай, і толькі з пашпартам Рэспублікі Беларусь. Астатнія краіны ў працы.',
		aboutTitle: 'Пра прыкладанне',
		aboutBody1:
			'Мікалай звязвае зніжку з імем. Не агульная акцыя для ўсіх — персанальная прапанова для канкрэтнага імя.',
		aboutBody2:
			"Зараз доступ адкрыты людзям з імем Мікалай і пашпартам грамадзяніна Рэспублікі Беларусь. Астатнія краіны ў працы. Рэгістрацыя з'явіцца пазней."
	},
	en: {
		metaDescription:
			'Mikalai — unique name-based discounts. For now only for people named Mikalai, and only with a passport of the Republic of Belarus.',
		langLabel: 'Language',
		themeLabel: 'Theme',
		themeLight: 'Light',
		themeDark: 'Dark',
		themeWinter: 'Winter',
		brand: 'Mikalai',
		title: 'Unique name-based discounts',
		lede: 'For now only for people named Mikalai, and only with a passport of the Republic of Belarus. Other countries are in progress.',
		aboutTitle: 'About the app',
		aboutBody1:
			'Mikalai ties a discount to a name. Not a generic promo for everyone — a personal offer for a specific name.',
		aboutBody2:
			'Access is currently open to people named Mikalai with a passport of a citizen of the Republic of Belarus. Other countries are in progress. Registration will come later.'
	}
};

export const localeMeta: Record<
	Locale,
	{ name: string; htmlLang: string; flagLabel: string }
> = {
	ru: { name: 'Русский', htmlLang: 'ru', flagLabel: 'Русский' },
	be: { name: 'Беларуская', htmlLang: 'be', flagLabel: 'Беларуская' },
	en: { name: 'English', htmlLang: 'en', flagLabel: 'English' }
};
