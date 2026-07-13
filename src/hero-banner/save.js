/**
 * WordPress dependencies.
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		heading,
		subHeading,
		buttonText,
		buttonUrl,
		backgroundImageUrl,
		overlayOpacity,
		contentAlignment,
		headingFontFamily,
		headingFontSize,
		headingFontWeight,
		headingLineHeight,
		headingTextColor,
		blockPadding,
		blockMargin,
		blockBorderRadius,
		blockShadow,
		buttonFontFamily,
		buttonFontSize,
		buttonFontWeight,
		buttonLineHeight,
		buttonTextColor,
		buttonBackgroundColor,
		buttonHoverColor,
		buttonPadding,
		buttonBorderRadius,
		buttonShadow,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `craftblocks-align-${ contentAlignment }`,
		style: {
			backgroundImage: backgroundImageUrl ? `url(${ backgroundImageUrl })` : undefined,
			padding: blockPadding + 'px',
			margin: blockMargin + 'px',
			borderRadius: blockBorderRadius + 'px',
			boxShadow: blockShadow !== 'none' ? blockShadow : undefined,
		},
	} );

	return (
		<div { ...blockProps }>
			<div
				className="craftblocks-hero-overlay"
				style={ { opacity: overlayOpacity / 100 } }
			/>

			<div className="craftblocks-hero-content">
				<RichText.Content
					tagName="h1"
					className="craftblocks-hero-heading"
					value={ heading }
				/>

				<RichText.Content
						tagName="h1"
						className="craftblocks-hero-heading"
						value={ heading }
						style={ {
							fontFamily: headingFontFamily,
							fontSize: headingFontSize + 'px',
							fontWeight: headingFontWeight,
							lineHeight: headingLineHeight,
							color: headingTextColor,

						} }
				/>

				<a href={ buttonUrl }
					className="craftblocks-hero-button"
					style={ {
						fontFamily: buttonFontFamily,
						fontSize: buttonFontSize + 'px',
						fontWeight: buttonFontWeight,
						lineHeight: buttonLineHeight,
						color: buttonTextColor,
						backgroundColor: buttonBackgroundColor,
						padding: buttonPadding + 'px ' + ( buttonPadding * 2 ) + 'px',
						borderRadius: buttonBorderRadius + 'px',
						boxShadow: buttonShadow !== 'none' ? buttonShadow : undefined,
						'--craftblocks-btn-hover-bg': buttonHoverColor,
					} }
				>
					<RichText.Content tagName="span" value={ buttonText } />
				</a>
			</div>
		</div>
	);
}