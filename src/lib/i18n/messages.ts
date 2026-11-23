import type { FamousId } from '../famous';

export const locales = ['be', 'ru'] as const;

export type Locale = (typeof locales)[number];

export type FamousPerson = {
	id: FamousId;
	name: string;
	role: string;
	blurb: string;
};

export type BlogPostMessages = {
	slug: string;
	date: string;
	title: string;
	excerpt: string;
	body: string[];
};

export type Messages = {
	metaDescription: string;
	langLabel: string;
	themeLabel: string;
	themeLight: string;
	themeDark: string;
	themeWinter: string;
	menuLabel: string;
	menuOpen: string;
	menuClose: string;
	settingsLabel: string;
	settingsOpen: string;
	settingsClose: string;
	navHome: string;
	navBlog: string;
	blogTitle: string;
	blogIntro: string;
	blogEmpty: string;
	blogBack: string;
	blogMetaDescription: string;
	blogPosts: BlogPostMessages[];
	brand: string;
	title: string;
	lede: string;
	aboutBody1: string;
	aboutBody2: string;
	registerCta: string;
	registerSoon: string;
	registerSoonClose: string;
	historyTitle: string;
	historyIntro: string;
	historyBody1: string;
	historyBody2: string;
	historyEtymology: string;
	historyMeaning: string;
	famousTitle: string;
	famousIntro: string;
	famousPhotoSoon: string;
	famousPeople: FamousPerson[];
	footerNote: string;
};

export const messages: Record<Locale, Messages> = {
	ru: {
		metaDescription: 'Николай — уникальные именные скидки.',
		langLabel: 'Язык',
		themeLabel: 'Тема',
		themeLight: 'Светлая',
		themeDark: 'Тёмная',
		themeWinter: 'Зимняя',
		menuLabel: 'Меню',
		menuOpen: 'Открыть меню',
		menuClose: 'Закрыть меню',
		settingsLabel: 'Настройки',
		settingsOpen: 'Открыть настройки',
		settingsClose: 'Закрыть настройки',
		navHome: 'Главная',
		navBlog: 'Блог',
		blogTitle: 'Блог',
		blogIntro: 'Заметки об имени, скидках и жизни Николаев.',
		blogEmpty: 'Записи скоро появятся.',
		blogBack: 'Все записи',
		blogMetaDescription: 'Блог Николая — заметки об имени и именных скидках.',
		blogPosts: [
			{
				slug: 'istoriya-imeni',
				date: '2026-11-19',
				title: 'История имени Николай',
				excerpt: 'Откуда взялось имя и почему оно звучит как «победа народа».',
				body: [
					'Имя Николай восходит к греческому Νικόλαος: «νίκη» — победа и «λαός» — народ.',
					'Оно распространилось благодаря святителю Николаю Чудотворцу и надолго осталось одним из самых узнаваемых мужских имён в регионе.'
				]
			},
			{
				slug: 'imennye-skidki',
				date: '2026-11-19',
				title: 'Что такое именные скидки',
				excerpt: 'Почему предложение привязано к имени, а не к общей акции для всех.',
				body: [
					'Именная скидка — это персональное предложение, связанное с конкретным именем.',
					'Web-приложение собирает такие предложения вокруг имени и открывает их по предъявлению паспорта.'
				]
			}
		],
		brand: 'Николай',
		title: 'Уникальные именные скидки',
		lede: 'Персональные предложения, связанные с именем — не общая акция для всех.',
		aboutBody1:
			'Web-приложение связывает скидку с именем: персональное предложение для конкретного имени.',
		aboutBody2: 'Каждая скидка доступна только по предъявлению паспорта.',
		registerCta: 'Зарегистрироваться',
		registerSoon:
			'Николай, регистрация в приложении уже в разработке, подожди немного.',
		registerSoonClose: 'Понятно',
		historyTitle: 'История имени',
		historyIntro: 'Николай — имя с греческими корнями и долгой христианской традицией.',
		historyBody1:
			'Оно восходит к греческому Νικόλαος: «νίκη» — победа и «λαός» — народ. Буквально — «победа народа».',
		historyBody2:
			'Имя распространилось благодаря святителю Николаю Чудотворцу, епископу Мир Ликийских. В белорусской и русской традиции оно звучит как Мікалай и Николай — одно из самых узнаваемых мужских имён в регионе.',
		historyEtymology: 'Νίκη + λαός',
		historyMeaning: 'победа народа',
		famousTitle: 'Известные Николаи',
		famousIntro: 'Имя носили святые, учёные, композиторы и поэты — от Мир Ликийских до Беларуси.',
		famousPhotoSoon: 'Фото скоро',
		famousPeople: [
			{
				id: 'saint-nicholas',
				name: 'Святитель Николай Чудотворец',
				role: 'Епископ Мир Ликийских',
				blurb: 'Святой, благодаря которому имя Николай стало одним из самых любимых в христианском мире.'
			},
			{
				id: 'husouski',
				name: 'Николай Гусовский',
				role: 'Поэт Возрождения',
				blurb: 'Автор «Песни о зубре» — голос белорусского Возрождения на латинском языке.'
			},
			{
				id: 'gogol',
				name: 'Николай Гоголь',
				role: 'Писатель',
				blurb: 'Классик, чьи «Мёртвые души» и «Ревизор» навсегда изменили русскую литературу.'
			},
			{
				id: 'lobachevsky',
				name: 'Николай Лобачевский',
				role: 'Математик',
				blurb: 'Создатель неевклидовой геометрии — один из тех, кто переписал карту науки.'
			},
			{
				id: 'rimsky-korsakov',
				name: 'Николай Римский-Корсаков',
				role: 'Композитор',
				blurb: 'Мастер оркестра и сказочной оперы, ключевая фигура «Могучей кучки».'
			}
		],
		footerNote:
			'Проект некоммерческий. Создан с целью безвозмездной помощи Николаям от Николаев.'
	},
	be: {
		metaDescription: 'Мікалай — унікальныя іменныя зніжкі.',
		langLabel: 'Мова',
		themeLabel: 'Тэма',
		themeLight: 'Светлая',
		themeDark: 'Цёмная',
		themeWinter: 'Зімовая',
		menuLabel: 'Меню',
		menuOpen: 'Адкрыць меню',
		menuClose: 'Закрыць меню',
		settingsLabel: 'Налады',
		settingsOpen: 'Адкрыць налады',
		settingsClose: 'Закрыць налады',
		navHome: 'Галоўная',
		navBlog: 'Блог',
		blogTitle: 'Блог',
		blogIntro: 'Нататкі пра імя, зніжкі і жыццё Мікалаеў.',
		blogEmpty: 'Запісы хутка з’явяцца.',
		blogBack: 'Усе запісы',
		blogMetaDescription: 'Блог Мікалая — нататкі пра імя і іменныя зніжкі.',
		blogPosts: [
			{
				slug: 'istoriya-imeni',
				date: '2026-11-19',
				title: 'Гісторыя імя Мікалай',
				excerpt: 'Адкуль узялося імя і чаму яно гучыць як «перамога народа».',
				body: [
					'Імя Мікалай паходзіць ад грэчаскага Νικόλαος: «νίκη» — перамога і «λαός» — народ.',
					'Яно стала папулярным дзякуючы свяціцелю Мікалаю Цудатворцу і засталося адным з самых пазнаваемых мужчынскіх імёнаў у рэгіёне.'
				]
			},
			{
				slug: 'imennye-skidki',
				date: '2026-11-19',
				title: 'Што такое іменныя зніжкі',
				excerpt: 'Чаму прапанова прывязана да імя, а не да агульнай акцыі для ўсіх.',
				body: [
					'Іменная зніжка — гэта персанальная прапанова, звязаная з канкрэтным імем.',
					'Web-прыкладанне збірае такія прапановы вакол імя і адкрывае іх па прад’яўленні пашпарта.'
				]
			}
		],
		brand: 'Мікалай',
		title: 'Унікальныя іменныя зніжкі',
		lede: 'Персанальныя прапановы, звязаныя з імем — не агульная акцыя для ўсіх.',
		aboutBody1:
			'Web-прыкладанне звязвае зніжку з імем: персанальная прапанова для канкрэтнага імя.',
		aboutBody2: 'Кожная зніжка даступная толькі па прад’яўленні пашпарта.',
		registerCta: 'Зарэгістравацца',
		registerSoon:
			'Мікалай, рэгістрацыя ў прыкладанні ўжо ў распрацоўцы, пачакай крыху.',
		registerSoonClose: 'Зразумела',
		historyTitle: 'Гісторыя імя',
		historyIntro: 'Мікалай — імя з грэчаскімі каранямі і доўгай хрысціянскай традыцыяй.',
		historyBody1:
			'Яно паходзіць ад грэчаскага Νικόλαος: «νίκη» — перамога і «λαός» — народ. Літаральна — «перамога народа».',
		historyBody2:
			'Імя стала папулярным дзякуючы свяціцелю Мікалаю Цудатворцу, епіскапу Міраў Лікійскіх. У беларускай і рускай традыцыі яно гучыць як Мікалай і Николай — адно з самых пазнаваемых мужчынскіх імёнаў у рэгіёне.',
		historyEtymology: 'Νίκη + λαός',
		historyMeaning: 'перамога народа',
		famousTitle: 'Вядомыя Мікалаі',
		famousIntro: 'Імя насілі святыя, вучоныя, кампазітары і паэты — ад Міраў Лікійскіх да Беларусі.',
		famousPhotoSoon: 'Фота хутка',
		famousPeople: [
			{
				id: 'saint-nicholas',
				name: 'Свяціцель Мікалай Цудатворац',
				role: 'Епіскап Міраў Лікійскіх',
				blurb: 'Святы, дзякуючы якому імя Мікалай стала адным з самых любімых у хрысціянскім свеце.'
			},
			{
				id: 'husouski',
				name: 'Мікалай Гусоўскі',
				role: 'Паэт Адраджэння',
				blurb: 'Аўтар «Песні пра зубра» — голас беларускага Адраджэння на лацінскай мове.'
			},
			{
				id: 'gogol',
				name: 'Мікалай Гогаль',
				role: 'Пісьменнік',
				blurb: 'Класік, чые «Мёртвыя душы» і «Рэвізор» назаўжды змянілі рускую літаратуру.'
			},
			{
				id: 'lobachevsky',
				name: 'Мікалай Лабачэўскі',
				role: 'Матэматык',
				blurb: 'Стваральнік нееўклідавай геаметрыі — адзін з тых, хто перапісаў карту навукі.'
			},
			{
				id: 'rimsky-korsakov',
				name: 'Мікалай Рымскі-Корсакаў',
				role: 'Кампазітар',
				blurb: 'Майстар аркестра і казачнай оперы, ключавая фігура «Магутнай купкі».'
			}
		],
		footerNote:
			'Праект некамерцыйны. Створаны з мэтай бескарыслівай дапамогі Мікалаям ад Мікалаеў.'
	}
};

export const localeMeta: Record<
	Locale,
	{ name: string; htmlLang: string; flagLabel: string }
> = {
	ru: { name: 'Русский', htmlLang: 'ru', flagLabel: 'Русский' },
	be: { name: 'Беларуская', htmlLang: 'be', flagLabel: 'Беларуская' }
};
