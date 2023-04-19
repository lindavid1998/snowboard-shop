import seasonKinImg from './images/season_kin_snowboard_2023.webp';
import gnuYoungMoneyImg from './images/gnu_young_money_C2E_2023.webp'
import burtonStepOnBoots from './images/burton_photon_step_on_boots.webp'
import burtonStepOnBindings	from './images/burton_step_on_reflex_bindings.webp'

const data = [
	{
		id: 0,
		name: 'Season Kin Snowboard 2023',
		price: 349,
		category: 'boards',
		imgSrc: seasonKinImg,
	},
	{
		id: 1,
		name: 'GNU Young Money C2E Snowboard - Big Boys 2023',
		price: 278,
		category: 'boards',
		imgSrc: gnuYoungMoneyImg,
	},
	{
		id: 2,
		name: `Men's Burton Photon Step On® Snowboard Boots`,
		price: 480,
		category: 'boots',
		imgSrc: burtonStepOnBoots,
	},
	{
		id: 3,
		name: `Men's Burton Step On® Re:Flex Snowboard Bindings`,
		price: 300,
		category: 'bindings',
		imgSrc: burtonStepOnBindings,
	},
	// ...
];

export default data;
