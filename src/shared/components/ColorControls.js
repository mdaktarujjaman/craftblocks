/**
 * WordPress dependencies.
 */
import { PanelBody, ColorPicker } from '@wordpress/components';

/**
 * Reusable Color panel for the block Inspector sidebar.
 *
 * @param {Object}   props
 * @param {string}   props.textColor          Current primary color (hex).
 * @param {string}   props.hoverColor         Current secondary/hover color (hex).
 * @param {Function} props.onTextColorChange   Callback when primary color changes.
 * @param {Function} props.onHoverColorChange  Callback when hover color changes.
 * @param {string}   [props.title]            Panel title. Defaults to "Color".
 * @param {boolean}  [props.showHover]        Whether to show the hover color picker. Defaults to true.
 * @param {string}   [props.textColorLabel]   Label for the primary color picker. Defaults to "Text Color".
 * @param {string}   [props.hoverColorLabel]  Label for the hover color picker. Defaults to "Hover Color".
 * @return {JSX.Element} Color controls panel.
 */
export default function ColorControls( {
	textColor,
	hoverColor,
	onTextColorChange,
	onHoverColorChange,
	title = 'Color',
	showHover = true,
	textColorLabel = 'Text Color',
	hoverColorLabel = 'Hover Color',
} ) {
	return (
		<PanelBody title={ title } initialOpen={ false }>
			<p className="craftblocks-color-label">{ textColorLabel }</p>
			<ColorPicker
				color={ textColor }
				onChange={ onTextColorChange }
				enableAlpha={ false }
				defaultView="hex"
			/>

			{ showHover && (
				<>
					<p className="craftblocks-color-label">{ hoverColorLabel }</p>
					<ColorPicker
						color={ hoverColor }
						onChange={ onHoverColorChange }
						enableAlpha={ false }
						defaultView="hex"
					/>
				</>
			) }
		</PanelBody>
	);
}