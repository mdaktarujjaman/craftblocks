/**
 * WordPress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Style imports (compiled by wp-scripts into build/hero-banner/*.css).
 */
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );