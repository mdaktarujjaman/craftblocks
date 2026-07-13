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
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `craftblocks-align-${ contentAlignment }`,
		style: backgroundImageUrl
			? { backgroundImage: `url(${ backgroundImageUrl })` }
			: undefined,
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
					tagName="p"
					className="craftblocks-hero-subheading"
					value={ subHeading }
				/>

				<a href={ buttonUrl } className="craftblocks-hero-button">
					<RichText.Content tagName="span" value={ buttonText } />
				</a>
			</div>
		</div>
	);
}