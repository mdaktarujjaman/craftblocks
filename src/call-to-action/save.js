/**
 * WordPress dependencies.
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		title,
		description,
		buttonText,
		buttonUrl,
		backgroundColor,
		useGradient,
		gradientColorStart,
		gradientColorEnd,
	} = attributes;

	const backgroundStyle = useGradient
		? {
				backgroundImage:
					'linear-gradient(135deg, ' +
					gradientColorStart +
					', ' +
					gradientColorEnd +
					')',
		  }
		: { backgroundColor };

	const blockProps = useBlockProps.save( {
		style: backgroundStyle,
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="h2"
				className="craftblocks-cta-title"
				value={ title }
			/>

			<RichText.Content
				tagName="p"
				className="craftblocks-cta-description"
				value={ description }
			/>

			<a href={ buttonUrl } className="craftblocks-cta-button">
				<RichText.Content tagName="span" value={ buttonText } />
			</a>
		</div>
	);
}